/**
 * Configuration options for the Poodle client
 */
export interface PoodleClientOptions {
  /**
   * The API key for authentication with Poodle's API
   */
  apiKey: string;
  /**
   * Optional base URL for the Poodle API (defaults to production URL)
   */
  baseUrl?: string;
}

/**
 * Parameters for sending an email
 */
export interface SendEmailOptions {
  /**
   * Email address of the sender
   */
  from: string;
  /**
   * Email address of the recipient
   */
  to: string;
  /**
   * Subject line of the email
   */
  subject: string;
  /**
   * HTML content of the email (optional if text is provided)
   */
  html?: string;
  /**
   * Plain text content of the email (optional if html is provided)
   */
  text?: string;
}

/**
 * Response from the send email API
 */
export interface SendEmailResponse {
  /**
   * Status of the email send request
   */
  status: 'queued' | 'failed';
  /**
   * Message ID if the email was successfully queued
   */
  messageId?: string;
  /**
   * Error message if the email failed to queue
   */
  error?: string;
}

/**
 * Custom error class for Poodle API errors
 */
export class PoodleError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'PoodleError';
  }
}
