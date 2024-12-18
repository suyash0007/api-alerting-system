const Redis = require('ioredis');
require('dotenv').config();

// Initialize Redis client for Redis Cloud
const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis Cloud Host
  port: process.env.REDIS_PORT || 6379, // Redis Cloud Port
  password: process.env.REDIS_PASSWORD, // Redis Cloud Password
  
});

// Event listeners for connection status
redis.on('connect', () => {
  console.log('Connected to Redis Cloud');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Increment failed attempts for a specific IP.
const incrementFailedAttempts = async (ip) => {
  try {
    const key = `failed:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 600); // Set expiry to 10 minutes
    }
    return count;
  } catch (error) {
    console.error('Error incrementing failed attempts:', error);
    throw error; // Rethrow for higher-level handling
  }
};

// Reset failed attempts for a specific IP.
const resetFailedAttempts = async (ip) => {
  try {
    await redis.del(`failed:${ip}`);
  } catch (error) {
    console.error('Error resetting failed attempts:', error);
    throw error;
  }
};

module.exports = { incrementFailedAttempts, resetFailedAttempts };
