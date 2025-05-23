// filepath: app/lib/api/rate-limiter.ts

/**
 * API Rate Limiter and Monitor
 * 
 * This utility helps track API rate limits and prevent exceeding them.
 * It can be used to monitor requests across multiple APIs and providers.
 */

interface RateLimitConfig {
  maxRequestsPerMinute: number;
  maxRequestsPerHour: number;
  maxRequestsPerDay: number;
}

interface ApiUsageStats {
  minuteCounter: number;
  hourCounter: number;
  dayCounter: number;
  minuteReset: number;
  hourReset: number;
  dayReset: number;
  lastWarningTime: number;
  nearingLimit: boolean;
}

const DEFAULT_RATE_LIMITS: Record<string, RateLimitConfig> = {
  'coinapi': {
    maxRequestsPerMinute: 100,
    maxRequestsPerHour: 1000,
    maxRequestsPerDay: 10000
  },
  'etherscan': {
    maxRequestsPerMinute: 5,
    maxRequestsPerHour: 200,
    maxRequestsPerDay: 2000
  },
  'default': {
    maxRequestsPerMinute: 30,
    maxRequestsPerHour: 300,
    maxRequestsPerDay: 3000
  }
};

const WARNING_THRESHOLD = 0.8; // 80% of the limit

// Track API usage
const apiUsage: Record<string, ApiUsageStats> = {};

/**
 * Initialize tracking for a new API
 */
const initializeApiTracking = (apiKey: string): void => {
  const now = Date.now();
  
  if (!apiUsage[apiKey]) {
    apiUsage[apiKey] = {
      minuteCounter: 0,
      hourCounter: 0,
      dayCounter: 0,
      minuteReset: now + 60 * 1000,
      hourReset: now + 60 * 60 * 1000,
      dayReset: now + 24 * 60 * 60 * 1000,
      lastWarningTime: 0,
      nearingLimit: false
    };
  }
};

/**
 * Track an API request and check if we're approaching rate limits
 * 
 * @param apiKey - Identifier for the API (e.g., 'coinapi', 'etherscan')
 * @returns Object with status information about rate limits
 */
export const trackApiRequest = (apiKey: string): {
  canProceed: boolean;
  nearingLimit: boolean;
  resetInMs: number | null;
  usagePercent: number;
} => {
  const now = Date.now();
  const api = apiKey.toLowerCase();
  
  // Initialize if needed
  if (!apiUsage[api]) {
    initializeApiTracking(api);
  }
  
  const usage = apiUsage[api];
  const limits = DEFAULT_RATE_LIMITS[api] || DEFAULT_RATE_LIMITS.default;
  
  // Reset counters if time has elapsed
  if (now >= usage.minuteReset) {
    usage.minuteCounter = 0;
    usage.minuteReset = now + 60 * 1000;
  }
  
  if (now >= usage.hourReset) {
    usage.hourCounter = 0;
    usage.hourReset = now + 60 * 60 * 1000;
  }
  
  if (now >= usage.dayReset) {
    usage.dayCounter = 0;
    usage.dayReset = now + 24 * 60 * 60 * 1000;
  }

  // Increment counters
  usage.minuteCounter++;
  usage.hourCounter++;
  usage.dayCounter++;
  
  // Check if we're hitting limits
  const minutePercent = usage.minuteCounter / limits.maxRequestsPerMinute;
  const hourPercent = usage.hourCounter / limits.maxRequestsPerHour;
  const dayPercent = usage.dayCounter / limits.maxRequestsPerDay;
  
  const maxPercent = Math.max(minutePercent, hourPercent, dayPercent);
  const canProceed = maxPercent < 1.0;
  
  // Determine which limit we're closest to hitting
  let closestLimit: number | null = null;
  if (minutePercent >= hourPercent && minutePercent >= dayPercent) {
    closestLimit = usage.minuteReset - now;
  } else if (hourPercent >= minutePercent && hourPercent >= dayPercent) {
    closestLimit = usage.hourReset - now;
  } else {
    closestLimit = usage.dayReset - now;
  }

  // Check if we're nearing the limit (and don't spam warnings)
  const nearingLimit = maxPercent >= WARNING_THRESHOLD;
  if (nearingLimit && !usage.nearingLimit) {
    usage.nearingLimit = true;
    console.warn(`[API Rate Limit Warning] ${api.toUpperCase()} API is at ${(maxPercent * 100).toFixed(1)}% of its rate limit. Reset in ${Math.ceil(closestLimit / 1000 / 60)} minutes.`);
  } else if (!nearingLimit && usage.nearingLimit) {
    usage.nearingLimit = false;
  }

  return {
    canProceed,
    nearingLimit,
    resetInMs: canProceed ? null : closestLimit,
    usagePercent: maxPercent
  };
};

/**
 * Checks if an API request can proceed without exceeding rate limits
 */
export const canMakeApiRequest = (apiKey: string): boolean => {
  const status = trackApiRequest(apiKey);
  return status.canProceed;
};

/**
 * Get current API usage statistics
 */
export const getApiUsage = (apiKey: string): {
  minuteUsage: number;
  hourUsage: number;
  dayUsage: number;
  minuteLimit: number;
  hourLimit: number;
  dayLimit: number;
} => {
  const api = apiKey.toLowerCase();
  
  if (!apiUsage[api]) {
    initializeApiTracking(api);
  }
  
  const usage = apiUsage[api];
  const limits = DEFAULT_RATE_LIMITS[api] || DEFAULT_RATE_LIMITS.default;
  
  return {
    minuteUsage: usage.minuteCounter,
    hourUsage: usage.hourCounter,
    dayUsage: usage.dayCounter,
    minuteLimit: limits.maxRequestsPerMinute,
    hourLimit: limits.maxRequestsPerHour,
    dayLimit: limits.maxRequestsPerDay
  };
};

/**
 * Reset all usage counters (typically used for testing)
 */
export const resetApiUsage = (apiKey?: string): void => {
  if (apiKey) {
    const api = apiKey.toLowerCase();
    delete apiUsage[api];
  } else {
    // Reset all
    Object.keys(apiUsage).forEach(key => {
      delete apiUsage[key];
    });
  }
};
