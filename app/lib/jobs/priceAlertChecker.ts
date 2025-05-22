import { PrismaClient } from '@prisma/client';
import axios from 'axios';

interface TelegramConfig {
  botToken: string;
  apiUrl: string;
}

// Initialize Prisma client
const prisma = new PrismaClient();

// Telegram configuration
const telegramConfig: TelegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  apiUrl: 'https://api.telegram.org/bot'
};

/**
 * Check price alerts and send notifications if triggered
 */
export async function checkPriceAlerts() {
  try {
    // Get all active non-triggered alerts
    const alerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
        isTriggered: false,
      },
      include: {
        user: true,
        token: true
      }
    });

    if (alerts.length === 0) {
      console.log('No active alerts to check');
      return;
    }

    console.log(`Checking ${alerts.length} price alerts`);

    // Group alerts by token to minimize API calls
    const tokenAlerts = alerts.reduce((acc, alert) => {
      const tokenId = alert.tokenId;
      if (!acc[tokenId]) {
        acc[tokenId] = [];
      }
      acc[tokenId].push(alert);
      return acc;
    }, {} as Record<string, any[]>);

    // Process each token's alerts
    for (const tokenId of Object.keys(tokenAlerts)) {
      // Get current price from API
      const token = tokenAlerts[tokenId][0].token;
      const currentPrice = await getTokenPrice(token.contractAddress, token.network);
      
      if (currentPrice === null) {
        console.error(`Failed to get price for token ${token.symbol}`);
        continue;
      }

      // Process each alert for this token
      for (const alert of tokenAlerts[tokenId]) {
        const isTriggered = alert.condition === 'ABOVE' 
          ? currentPrice >= alert.targetPrice
          : currentPrice <= alert.targetPrice;

        if (isTriggered) {
          // Mark alert as triggered
          await prisma.priceAlert.update({
            where: { id: alert.id },
            data: { 
              isTriggered: true,
              triggeredAt: new Date()
            }
          });

          // Send Telegram notification
          await sendTelegramNotification(
            alert.user.telegramId,
            `🔔 Price Alert: ${token.symbol} is now ${alert.condition === 'ABOVE' ? 'above' : 'below'} $${alert.targetPrice}!\n\nCurrent price: $${currentPrice.toFixed(2)}`
          );

          console.log(`Alert triggered for ${token.symbol} - User: ${alert.user.telegramId}, Condition: ${alert.condition}, Target: ${alert.targetPrice}, Current: ${currentPrice}`);
        }
      }
    }
  } catch (error) {
    console.error('Error checking price alerts:', error);
  }
}

/**
 * Get current token price from external API
 */
async function getTokenPrice(contractAddress: string, network: string): Promise<number | null> {
  try {
    // Implementation will depend on which price API you're using
    // Example with a hypothetical price API:
    const response = await axios.get(`/api/external/price`, {
      params: { contractAddress, network }
    });
    
    return response.data.price;
  } catch (error) {
    console.error(`Error fetching price for ${contractAddress} on ${network}:`, error);
    return null;
  }
}

/**
 * Send notification via Telegram Bot
 */
async function sendTelegramNotification(telegramId: number, message: string): Promise<boolean> {
  try {
    if (!telegramConfig.botToken) {
      console.error('Telegram bot token not configured');
      return false;
    }

    const url = `${telegramConfig.apiUrl}${telegramConfig.botToken}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: telegramId,
      text: message,
      parse_mode: 'HTML'
    });

    return response.data.ok === true;
  } catch (error) {
    console.error(`Error sending Telegram notification to ${telegramId}:`, error);
    return false;
  }
}
