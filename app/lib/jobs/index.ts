import { checkPriceAlerts } from './priceAlertChecker';

/**
 * Main job scheduler for the application
 * This will be called by a cron job or a worker process
 */
export async function runScheduledJobs() {
  console.log('Starting scheduled jobs', new Date().toISOString());
  
  try {
    // Check price alerts every run
    await checkPriceAlerts();
    
    // Add other periodic tasks here:
    // - Update token prices in database
    // - Process pending transactions
    // - Update user rankings
    // - Clean up expired sessions
    
    console.log('Scheduled jobs completed', new Date().toISOString());
  } catch (error) {
    console.error('Error running scheduled jobs:', error);
  }
}

// For local testing or direct execution
if (require.main === module) {
  runScheduledJobs()
    .then(() => {
      console.log('Jobs executed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to execute jobs:', error);
      process.exit(1);
    });
}
