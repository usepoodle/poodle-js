// CommonJS import
const { PoodleClient } = require('../dist');

// Initialize the client with your API key
const client = new PoodleClient({
  apiKey: 'your-api-key-here',
});

// Example function to send an email
async function sendTestEmail() {
  try {
    const response = await client.sendEmail({
      from: 'sender@yourdomain.com',
      to: 'recipient@example.com',
      subject: 'Test Email from Poodle SDK (JavaScript)',
      html: '<h1>Hello from Poodle!</h1><p>This is a test email sent using the Poodle JavaScript SDK.</p>',
      text: 'Hello from Poodle! This is a test email sent using the Poodle JavaScript SDK.',
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', response.messageId);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}

// Run the example
sendTestEmail();
