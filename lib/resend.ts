import { Resend } from 'resend';
import { env } from './env';

/**
 * Shared Resend client instance.
 * Using env.RESEND_API_KEY for validation.
 */
// Lazy initialization to prevent crash if key is missing
export const getResend = () => {
    if (!env.RESEND_API_KEY) {
        throw new Error("Resend API Key is missing");
    }
    return new Resend(env.RESEND_API_KEY);
};

// Backward compatibility (returns null/undefined or throws if used? better to throw inside usage)
export const resend = new Proxy({} as Resend, {
    get: (_target, prop) => {
        return (getResend() as any)[prop];
    }
});
