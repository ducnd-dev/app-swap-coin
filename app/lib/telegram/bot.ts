import { Telegraf } from 'telegraf';
import { prisma } from '../utils/prisma';

// Initialize the bot with token from environment variables
const bot = process.env.TELEGRAM_BOT_TOKEN 
  ? new Telegraf(process.env.TELEGRAM_BOT_TOKEN) 
  : null;

// Check if bot is configured
if (!bot) {
  console.warn('TELEGRAM_BOT_TOKEN not set. Bot notifications will not work.');
}

/**
 * Send a notification to a Telegram user
 * @param telegramId - The Telegram user ID
 * @param message - The message to send
 * @param type - The type of notification
 * @param referenceId - Optional reference ID to a transaction or price alert
 * @returns boolean - Whether the notification was sent successfully
 */
export async function sendNotification(
  telegramId: number, 
  message: string, 
  type: 'TRANSACTION' | 'PRICE_ALERT' | 'REMINDER' | 'BROADCAST',
  referenceId?: string
): Promise<boolean> {
  try {
    if (!bot) {
      console.warn('Bot not configured, notification not sent');
      return false;
    }

    // Store notification in the database
    await prisma.notification.create({
      data: {
        telegramId,
        message,
        type,
        referenceId,
        isDelivered: false,
      },
    });

    // Send notification using Telegram bot
    await bot.telegram.sendMessage(telegramId, message, { parse_mode: 'HTML' });

    // Update notification status
    await prisma.notification.updateMany({
      where: {
        telegramId,
        message,
        type,
        referenceId,
      },
      data: {
        isDelivered: true,
      },
    });

    return true;
  } catch (error) {
    console.error(`Error sending notification to ${telegramId}:`, error);
    return false;
  }
}

/**
 * Send a transaction notification
 * @param telegramId - The Telegram user ID
 * @param txId - The transaction ID
 * @param status - The transaction status
 * @param details - Optional transaction details
 */
export async function sendTransactionNotification(
  telegramId: number,
  txId: string,
  status: 'PENDING' | 'SUCCESS' | 'FAILED',
  details?: {
    fromToken?: string;
    toToken?: string;
    fromAmount?: string;
    toAmount?: string;
  }
): Promise<boolean> {
  let message = `<b>Transaction ${status}</b>\n\nID: ${txId}`;

  if (details) {
    const { fromToken, toToken, fromAmount, toAmount } = details;
    if (fromToken && toToken && fromAmount && toAmount) {
      message += `\n\nSwapped ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`;
    }
  }

  return sendNotification(telegramId, message, 'TRANSACTION', txId);
}

/**
 * Send a price alert notification
 * @param telegramId - The Telegram user ID
 * @param alertId - The price alert ID
 * @param tokenSymbol - The token symbol
 * @param price - The current price
 * @param targetPrice - The target price
 * @param condition - The condition (ABOVE/BELOW)
 */
export async function sendPriceAlertNotification(
  telegramId: number,
  alertId: string,
  tokenSymbol: string,
  price: number,
  targetPrice: number,
  condition: 'ABOVE' | 'BELOW'
): Promise<boolean> {
  const message = `<b>Price Alert</b>\n\n${tokenSymbol} is now ${condition === 'ABOVE' ? 'above' : 'below'} your target price.\n\nCurrent price: $${price.toFixed(4)}\nTarget price: $${targetPrice.toFixed(4)}`;

  return sendNotification(telegramId, message, 'PRICE_ALERT', alertId);
}

/**
 * Send a broadcast message to multiple users
 * @param telegramIds - Array of Telegram user IDs
 * @param message - The message to send
 */
export async function sendBroadcastMessage(telegramIds: number[], message: string): Promise<void> {
  if (!bot) {
    console.warn('Bot not configured, broadcast not sent');
    return;
  }

  const promises = telegramIds.map((telegramId) => 
    sendNotification(telegramId, message, 'BROADCAST')
  );

  await Promise.allSettled(promises);
}

export { bot };