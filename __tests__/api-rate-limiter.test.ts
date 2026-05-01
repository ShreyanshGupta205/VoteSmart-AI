/**
 * Tests for the in-memory rate limiter logic used in /api/chat.
 * We test the logic in isolation without making HTTP calls.
 */

// Replicate the rate limiting logic from the API route
function createRateLimiter(maxRequests = 10, windowMs = 60000) {
  const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

  return function check(ip: string, now = Date.now()): { allowed: boolean; remaining: number } {
    const rateData = rateLimitMap.get(ip);

    if (rateData && now - rateData.timestamp < windowMs) {
      if (rateData.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
      }
      rateData.count++;
      return { allowed: true, remaining: maxRequests - rateData.count };
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
      return { allowed: true, remaining: maxRequests - 1 };
    }
  };
}

describe('API Rate Limiter Logic', () => {
  it('should allow the first request from a new IP', () => {
    const check = createRateLimiter(10, 60000);
    const result = check('192.168.1.1');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it('should allow up to maxRequests from the same IP within the window', () => {
    const check = createRateLimiter(5, 60000);
    const ip = '10.0.0.1';
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
      const result = check(ip, now);
      expect(result.allowed).toBe(true);
    }
  });

  it('should block the request after exceeding maxRequests', () => {
    const check = createRateLimiter(3, 60000);
    const ip = '10.0.0.2';
    const now = Date.now();

    check(ip, now);
    check(ip, now);
    check(ip, now);

    const blocked = check(ip, now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('should reset the counter after the time window expires', () => {
    const check = createRateLimiter(2, 60000);
    const ip = '10.0.0.3';
    const now = Date.now();

    check(ip, now);
    check(ip, now);
    expect(check(ip, now).allowed).toBe(false);

    // Simulate 61 seconds passing
    const later = now + 61000;
    const result = check(ip, later);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(1);
  });

  it('should track multiple IPs independently', () => {
    const check = createRateLimiter(2, 60000);
    const now = Date.now();

    check('192.168.0.1', now);
    check('192.168.0.1', now);
    expect(check('192.168.0.1', now).allowed).toBe(false);

    // Different IP should still be allowed
    expect(check('192.168.0.2', now).allowed).toBe(true);
  });
});
