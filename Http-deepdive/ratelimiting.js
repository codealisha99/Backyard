const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ client }),
  message: { error: 'Too many requests, try again later.' }
});

// Strict limiter for OTP send endpoint
const otpSendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                    // Max 5 OTP sends per IP per hour
  keyGenerator: (req) => req.ip + ':' + req.body.email, // Per IP+email combo
});

// Strict limiter for OTP verify endpoint
const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.ip,
});

// Apply to routes
app.post('/auth/send-otp', otpSendLimiter, sendOTPHandler);
app.post('/auth/verify-otp', otpVerifyLimiter, verifyOTPHandler);