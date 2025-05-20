import { PoodleClient, PoodleError } from '../src';

// Initialize the client with your API key
const client = new PoodleClient({
  apiKey: 'your-api-key-here',
});

// Example function to send an email
async function sendTestEmail(): Promise<void> {
  try {
    const response = await client.sendEmail({
      from: 'sender@yourdomain.com',
      to: 'recipient@example.com',
      subject: 'Test Email from Poodle SDK',
      html: '<h1>Hello from Poodle!</h1><p>This is a test email sent using the Poodle JavaScript SDK.</p>',
      text: 'Hello from Poodle! This is a test email sent using the Poodle JavaScript SDK.',
    });

    console.log('Email API call successful:', response.message);
  } catch (error: any) {
    // Log the basic error message
    console.error('Failed to send email:', error.message);

    // Check if it's a PoodleError for more details
    if (error instanceof PoodleError) {
      console.error('Status Code:', error.statusCode);
      console.error('Specific Details:', error.details);
    } else if (!(error instanceof Error)) {
      // Handle cases where error might not be an Error instance
      console.error('An unknown error occurred:', error);
    }
  }
}

// Run the example
sendTestEmail();
