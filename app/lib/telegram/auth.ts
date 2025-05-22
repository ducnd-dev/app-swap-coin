import crypto from 'crypto';

/**
 * Check if the Telegram WebApp data is valid
 * @param initData - The WebApp init data
 * @returns boolean - Whether the data is valid
 */
export function validateTelegramWebAppData(initData: string): boolean {
  try {
    // Extract the data and hash from the init data
    const searchParams = new URLSearchParams(initData);
    const hash = searchParams.get('hash');
    if (!hash) return false;
    
    // Remove the hash from the data to validate
    searchParams.delete('hash');
    
    // Sort the parameters alphabetically
    const dataCheckArray: string[] = [];
    const sortedKeys = Array.from(searchParams.keys()).sort();

    for (const key of sortedKeys) {
      const value = searchParams.get(key);
      if (value) {
        dataCheckArray.push(`${key}=${value}`);
      }
    }
    const dataCheckString = dataCheckArray.join('\n');
    
    // Calculate the HMAC-SHA-256 signature
    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(process.env.TELEGRAM_BOT_TOKEN || '')
      .digest();
    
    const calculatedHash = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    // Compare the hash
    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram WebApp data:', error);
    return false;
  }
}

/**
 * Extract the user data from Telegram WebApp init data
 * @param initData - The WebApp init data
 * @returns The user data or null if invalid
 */
export function extractTelegramUserData(initData: string): TelegramUserData | null {
  try {
    const searchParams = new URLSearchParams(initData);
    const userStr = searchParams.get('user');
    if (!userStr) return null;
    
    const user = JSON.parse(decodeURIComponent(userStr));
    
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      language_code: user.language_code,
    };
  } catch (error) {
    console.error('Error extracting user data from Telegram WebApp:', error);
    return null;
  }
}

/**
 * Types for Telegram User data
 */
export interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}