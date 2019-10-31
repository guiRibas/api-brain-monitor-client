import rateLimit from 'express-rate-limit';

const credentialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests to credential from this IP, please try again after an hour."
});

const notaryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests to notary from this IP, please try again after an hour."
});

module.exports = {
    credentialLimiter: credentialLimiter,
    notaryLimiter: notaryLimiter
}
