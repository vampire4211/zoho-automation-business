type RateLimitStore = Map<string, { count: number; expiresAt: number }>;

const rateLimits: RateLimitStore = new Map();

// Configuration
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute per IP
const MAX_STORE_SIZE = 5000; // Maximum number of IPs to track to prevent memory leaks

// Cleanup interval (runs every minute)
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimits.entries()) {
        if (now > data.expiresAt) {
            rateLimits.delete(ip);
        }
    }
}, 60 * 1000);

export function checkRateLimit(ip: string) {
    const now = Date.now();
    const record = rateLimits.get(ip);

    // If record exists and is valid
    if (record) {
        // If expired, reset
        if (now > record.expiresAt) {
            rateLimits.set(ip, { count: 1, expiresAt: now + WINDOW_SIZE });
            return true;
        }

        // Increment count
        record.count++;

        // Check limit
        if (record.count > MAX_REQUESTS) {
            return false;
        }

        return true;
    }

    // New record
    // Safety check for memory overflow
    if (rateLimits.size >= MAX_STORE_SIZE) {
        // Emergency cleanup - remove oldest (simplistic approach: clear all to be safe and fast)
        // In a real production app with Redis, this isn't an issue.
        // For in-memory, clearing helps recover immediately.
        rateLimits.clear();
    }

    rateLimits.set(ip, { count: 1, expiresAt: now + WINDOW_SIZE });
    return true;
}
