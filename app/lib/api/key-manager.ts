// filepath: app/lib/api/key-manager.ts

/**
 * API Key Manager
 * 
 * This utility manages API keys and implements key rotation for security.
 * It can be used to rotate between multiple API keys to avoid rate limits or enhance security.
 */

import { trackApiRequest } from './rate-limiter';

interface ApiKey {
  key: string;
  isActive: boolean;
  lastUsed: number;
  usageCount: number;
  errorCount: number;
  nextRotation?: number;
}

// Configuration for key rotation
interface RotationConfig {
  enabled: boolean;
  interval: number;  // milliseconds
  errorThreshold: number;
  maxUsageBeforeRotation?: number;
}

// Initial configuration
const API_KEYS: Record<string, ApiKey[]> = {
  'coinapi': [],
  'etherscan': []
};

// Default rotation settings
const DEFAULT_ROTATION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const ERROR_THRESHOLD = 5; // Number of errors before a key is marked for rotation

// Rotation configuration
const ROTATION_CONFIG: Record<string, RotationConfig> = {
  'coinapi': {
    enabled: true,
    interval: DEFAULT_ROTATION_INTERVAL,
    errorThreshold: ERROR_THRESHOLD,
    maxUsageBeforeRotation: 5000 // Rotate after 5000 uses
  },
  'etherscan': {
    enabled: true,
    interval: DEFAULT_ROTATION_INTERVAL,
    errorThreshold: ERROR_THRESHOLD,
    maxUsageBeforeRotation: 1500 // Rotate after 1500 uses
  },
  'default': {
    enabled: true,
    interval: DEFAULT_ROTATION_INTERVAL,
    errorThreshold: ERROR_THRESHOLD
  }
};

// Add the default keys from environment variables
const setupDefaultKeys = () => {
  const coinapiKey = process.env.COINAPI_KEY;
  if (coinapiKey && !API_KEYS.coinapi.some(k => k.key === coinapiKey)) {
    API_KEYS.coinapi.push({
      key: coinapiKey,
      isActive: true,
      lastUsed: 0,
      usageCount: 0,
      errorCount: 0,
      nextRotation: Date.now() + DEFAULT_ROTATION_INTERVAL
    });
  }

  const etherscanKey = process.env.ETHERSCAN_API_KEY;
  if (etherscanKey && !API_KEYS.etherscan.some(k => k.key === etherscanKey)) {
    API_KEYS.etherscan.push({
      key: etherscanKey,
      isActive: true,
      lastUsed: 0,
      usageCount: 0,
      errorCount: 0,
      nextRotation: Date.now() + DEFAULT_ROTATION_INTERVAL
    });
  }
};

/**
 * Add a new API key to the rotation pool
 */
export const addApiKey = (
  service: string,
  key: string,
  options: { 
    rotationInterval?: number 
  } = {}
): void => {
  const serviceKey = service.toLowerCase();
  
  // Create the service entry if it doesn't exist
  if (!API_KEYS[serviceKey]) {
    API_KEYS[serviceKey] = [];
  }
  
  // Check if the key already exists
  if (API_KEYS[serviceKey].some(k => k.key === key)) {
    return; // Key already exists, do nothing
  }
  
  // Add the new key
  API_KEYS[serviceKey].push({
    key,
    isActive: true,
    lastUsed: 0,
    usageCount: 0,
    errorCount: 0,
    nextRotation: Date.now() + (options.rotationInterval || DEFAULT_ROTATION_INTERVAL)
  });
  
  console.log(`Added new API key for ${serviceKey}`);
};

/**
 * Get the current best API key to use
 */
export const getApiKey = (service: string): string | null => {
  const serviceKey = service.toLowerCase();
  
  // Initialize default keys if needed
  if (Object.keys(API_KEYS).length === 0 || 
      (API_KEYS.coinapi && API_KEYS.coinapi.length === 0) ||
      (API_KEYS.etherscan && API_KEYS.etherscan.length === 0)) {
    setupDefaultKeys();
  }
  
  // If no keys are available for this service
  if (!API_KEYS[serviceKey] || API_KEYS[serviceKey].length === 0) {
    console.warn(`No API keys available for ${serviceKey}`);
    return null;
  }
  
  const now = Date.now();
  const config = ROTATION_CONFIG[serviceKey] || ROTATION_CONFIG.default;
  
  // First, check if we need to rotate any keys
  API_KEYS[serviceKey].forEach(key => {
    // Check time-based rotation
    if (config.enabled && key.nextRotation && key.nextRotation < now) {
      // Time to rotate this key
      key.isActive = false;
      console.log(`Rotating API key for ${serviceKey} due to scheduled rotation`);
    }
    
    // Check error-based rotation
    if (config.enabled && key.errorCount >= config.errorThreshold) {
      // Too many errors with this key
      key.isActive = false;
      console.warn(`Rotating API key for ${serviceKey} due to error threshold reached (${key.errorCount} errors)`);
    }
    
    // Check usage-based rotation
    if (config.enabled && config.maxUsageBeforeRotation && key.usageCount >= config.maxUsageBeforeRotation) {
      key.isActive = false;
      console.log(`Rotating API key for ${serviceKey} due to usage limit reached (${key.usageCount} uses)`);
    }
  });
  
  // Find active keys
  const activeKeys = API_KEYS[serviceKey].filter(k => k.isActive);
  
  // If no active keys, try to reactivate all keys as a fallback
  if (activeKeys.length === 0) {
    API_KEYS[serviceKey].forEach(key => {
      key.isActive = true;
      key.errorCount = 0;
      key.usageCount = 0; // Reset usage count on reactivation
      key.nextRotation = now + (config.interval || DEFAULT_ROTATION_INTERVAL);
    });
    console.log(`Reactivated all API keys for ${serviceKey} as all were inactive`);
    return getApiKey(service); // Recursive call, but should now have active keys
  }
  
  // Select the best key based on:
  // 1. Rate limit availability
  // 2. Least recently used
  
  // First check rate limits
  for (const key of activeKeys) {
    if (trackApiRequest(`${serviceKey}-${key.key.substring(0, 8)}`).canProceed) {
      // Update usage statistics
      key.lastUsed = now;
      key.usageCount++;
      
      // Return the key
      return key.key;
    }
  }
  
  // If we're here, all keys are at their rate limits
  // Return the least recently used key as a fallback
  activeKeys.sort((a, b) => a.lastUsed - b.lastUsed);
  const selectedKey = activeKeys[0];
  
  if (selectedKey) {
    selectedKey.lastUsed = now;
    selectedKey.usageCount++;
    return selectedKey.key;
  }
  
  return null;
};

/**
 * Report an error with an API key to potentially trigger rotation
 */
export const reportApiKeyError = (service: string, key: string): void => {
  const serviceKey = service.toLowerCase();
  
  if (!API_KEYS[serviceKey]) return;
  
  const keyEntry = API_KEYS[serviceKey].find(k => k.key === key);
  if (keyEntry) {
    keyEntry.errorCount++;
    console.warn(`API key error reported for ${serviceKey}. Error count: ${keyEntry.errorCount}`);
    
    const config = ROTATION_CONFIG[serviceKey] || ROTATION_CONFIG.default;
    
    if (config.enabled && keyEntry.errorCount >= config.errorThreshold) {
      keyEntry.isActive = false;
      console.warn(`API key for ${serviceKey} deactivated due to error threshold`);
    }
  }
};

/**
 * Configure API key rotation settings
 */
export const configureKeyRotation = (
  service: string, 
  settings: Partial<RotationConfig>
): void => {
  const serviceKey = service.toLowerCase();
  
  // Create config if it doesn't exist
  if (!ROTATION_CONFIG[serviceKey]) {
    ROTATION_CONFIG[serviceKey] = { ...ROTATION_CONFIG.default };
  }
  
  // Update with new settings
  ROTATION_CONFIG[serviceKey] = {
    ...ROTATION_CONFIG[serviceKey],
    ...settings
  };
  
  console.log(`Updated key rotation settings for ${serviceKey}:`, ROTATION_CONFIG[serviceKey]);
};

/**
 * Manually rotate a service's API key
 */
export const rotateApiKey = (service: string, currentKey?: string): string | null => {
  const serviceKey = service.toLowerCase();
  
  if (!API_KEYS[serviceKey] || API_KEYS[serviceKey].length === 0) {
    return null;
  }
  
  // If a specific key is provided, mark it as inactive
  if (currentKey) {
    const keyEntry = API_KEYS[serviceKey].find(k => k.key === currentKey);
    if (keyEntry) {
      keyEntry.isActive = false;
    }
  } else {
    // If no specific key, mark the most used key as inactive
    const mostUsedKey = [...API_KEYS[serviceKey]]
      .filter(k => k.isActive)
      .sort((a, b) => b.usageCount - a.usageCount)[0];
      
    if (mostUsedKey) {
      mostUsedKey.isActive = false;
      console.log(`Manually rotated most used API key for ${serviceKey}`);
    }
  }
  
  // Get the next key
  return getApiKey(service);
};

/**
 * Get statistics about API key usage
 */
export const getApiKeyStats = (service: string): {
  totalKeys: number;
  activeKeys: number;
  totalUsage: number;
  rotationEnabled: boolean;
  nextRotationTime?: number;
} => {
  const serviceKey = service.toLowerCase();
  
  if (!API_KEYS[serviceKey]) {
    return { totalKeys: 0, activeKeys: 0, totalUsage: 0, rotationEnabled: false };
  }
  
  // Find the next key to be rotated
  const activeKeys = API_KEYS[serviceKey].filter(k => k.isActive);
  let nextRotation = activeKeys.length > 0 ? 
    Math.min(...activeKeys.filter(k => k.nextRotation).map(k => k.nextRotation || Number.MAX_SAFE_INTEGER)) : 
    undefined;
    
  // Convert to undefined if it's the max integer (no rotation scheduled)
  if (nextRotation === Number.MAX_SAFE_INTEGER) nextRotation = undefined;
  
  return {
    totalKeys: API_KEYS[serviceKey].length,
    activeKeys: activeKeys.length,
    totalUsage: API_KEYS[serviceKey].reduce((sum, key) => sum + key.usageCount, 0),
    rotationEnabled: (ROTATION_CONFIG[serviceKey] || ROTATION_CONFIG.default).enabled,
    nextRotationTime: nextRotation
  };
};
