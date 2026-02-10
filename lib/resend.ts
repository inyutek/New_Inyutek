import { Resend } from 'resend';
import { env } from './env';

/**
 * Shared Resend client instance.
 * Using env.RESEND_API_KEY for validation.
 */
export const resend = new Resend(env.RESEND_API_KEY);
