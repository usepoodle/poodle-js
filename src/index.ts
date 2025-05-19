import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  PoodleClientOptions,
  PoodleError,
  SendEmailOptions,
  SendEmailResponse,
} from './types';

/**
 * Default base URL for the Poodle API
 */
const DEFAULT_BASE_URL = 'https://api.usepoodle.com/v1';

/**
 * Main client class for interacting with the Poodle API
 */
export class PoodleClient {
  private readonly client: AxiosInstance;

  /**
   * Creates a new instance of the Poodle client
   * @param options Configuration options for the client
   */
  constructor(private readonly options: PoodleClientOptions) {
    if (!options.apiKey) {
      throw new Error('API key is required');
    }

    this.client = axios.create({
      baseURL: options.baseUrl || DEFAULT_BASE_URL,
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'poodle-js/0.1.0',
      },
    });
  }

  /**
   * Sends an email using the Poodle API
   * @param options Email sending options
   * @returns A promise that resolves with the send email response
   * @throws {PoodleError} If the API request fails
   */
  async sendEmail(options: SendEmailOptions): Promise<SendEmailResponse> {
    if (!options.from) throw new Error('From address is required');
    if (!options.to) throw new Error('To address is required');
    if (!options.subject) throw new Error('Subject is required');
    if (!options.html && !options.text) {
      throw new Error('Either html or text content is required');
    }

    try {
      const response = await this.client.post<SendEmailResponse>(
        '/send-email',
        options
      );
      return response.data;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'isAxiosError' in error &&
        error.isAxiosError
      ) {
        const axiosError = error as AxiosError<{
          message: string;
          code: string;
        }>;
        if (axiosError.response?.data) {
          throw new PoodleError(
            axiosError.response.data.message || 'API request failed',
            axiosError.response.status,
            axiosError.response.data.code
          );
        }
      }
      throw new PoodleError('Failed to send email');
    }
  }
}

// Export types
export * from './types';
