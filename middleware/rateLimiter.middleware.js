const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 10 minutes)
  message: 'Too many requests, please try again later.',
  headers: true, // Enable rate limit headers
});



module.exports = 
{
    rateLimiter
}