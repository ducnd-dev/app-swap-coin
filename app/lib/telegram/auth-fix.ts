// Enhanced Telegram WebApp validation function
import crypto from 'crypto';

/**
 * Validates Telegram WebApp data with more debugging
 * Based on official Telegram WebApp documentation
 */
export function validateTelegramWebAppData(initDataString: string): boolean {
  try {
    // 1. Parse the initData string into params
    const params = new URLSearchParams(initDataString);
    
    // 2. Extract the hash - we'll verify this
    const hash = params.get('hash');
    if (!hash) {
      console.log('No hash parameter found in init data');
      return false;
    }
    
    // 3. Remove hash from the data we're validating
    params.delete('hash');
    
    // 4. Create a sorted array of key=value strings
    const dataParams: string[] = [];
    Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        dataParams.push(`${key}=${value}`);
      });
    
    // 5. Join with newlines as specified in Telegram docs
    const dataCheckString = dataParams.join('\n');
    console.log('Data string to verify:', dataCheckString.substring(0, 50) + '...');
    
    // 6. Get the bot token
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.log('Bot token is missing!');
      return false;
    }
    
    // 7. Create the secret key using the bot token
    // The correct way according to Telegram docs:
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();
    
    // 8. Calculate the expected hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    // 9. Compare the hashes
    const isValid = calculatedHash === hash;
    console.log(`Hash validation: ${isValid ? 'PASSED' : 'FAILED'}`);
    console.log(`Received hash: ${hash.substring(0, 10)}...`);
    console.log(`Calculated hash: ${calculatedHash.substring(0, 10)}...`);
    
    // Alternative validation method
    console.log('Trying alternative validation method...');
    
    // Some implementations use a different approach to calculate the key
    const altSecretKey = crypto
      .createHash('sha256')
      .update(botToken)
      .digest();
    
    const altCalculatedHash = crypto
      .createHmac('sha256', altSecretKey)
      .update(dataCheckString)
      .digest('hex');
    
    const altIsValid = altCalculatedHash === hash;
    console.log(`Alternative validation: ${altIsValid ? 'PASSED' : 'FAILED'}`);
    
    return isValid || altIsValid;
  } catch (error) {
    console.error('Error in validateTelegramWebAppData:', error);
    return false;
  }
}
