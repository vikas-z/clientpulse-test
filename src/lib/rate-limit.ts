/**
 * Token-bucket rate limiter for API routes
 * Tracks requests per IP with configurable window and max tokens
 */

interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  maxTokens: number;     // max requests in window
  refillRate: number;    // tokens added per second
  windowMs: number;      // cleanup window
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxTokens: 60,
  refillRate: 1,
  windowMs: 60_000,
};

export function rateLimit(ip: string, config: RateLimitConfig = DEFAULT_CONFIG): {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
} {
  const now = Date.now();
  let entry = store.get(ip);

  if (!entry) {
    entry = { tokens: config.maxTokens - 1, lastRefill: now };
    store.set(ip, entry);
    return { allowed: true, remaining: entry.tokens, resetAt: new Date(now + config.windowMs) };
  }

  // Refill tokens based on elapsed time
  const elapsed = (now - entry.lastRefill) / 1000;
  entry.tokens = Math.min(config.maxTokens, entry.tokens + elapsed * config.refillRate);
  entry.lastRefill = now;

  if (entry.tokens < 1) {
    return { allowed: false, remaining: 0, resetAt: new Date(now + config.windowMs) };
  }

  entry.tokens -= 1;
  return { allowed: true, remaining: Math.floor(entry.tokens), resetAt: new Date(now + config.windowMs) };
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of store.entries()) {
    if (now - entry.lastRefill > 300_000) {
      store.delete(ip);
    }
  }
}, 300_000);
