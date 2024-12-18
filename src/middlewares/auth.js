const { incrementFailedAttempts } = require('../services/redisService');
const FailureLog = require('../models/failureLog');
const sendEmailAlert = require('../services/emailService');
// Threshold for the number of failed attempts allowed before triggering an alert
const THRESHOLD = 5;
// Middleware function to validate incoming requests
const validateRequest = async (req, res, next) => {
    const { authorization } = req.headers;
    const clientIp = req.ip;
// Check if the authorization header is missing or invalid
    if (!authorization || authorization !== 'Bearer valid-token') {//using 'Bearer valid-token as valid authorization header'
        const reason = 'Invalid token or missing headers';
        try {
             // Log the failure attempt in the database with the reason and IP address
             await FailureLog.create({ ip: clientIp, reason });

             // Increment the failure count for the given IP in Redis
             const failedCount = await incrementFailedAttempts(clientIp);
 
             // If the failure count exceeds the threshold, send an email alert
             if (failedCount > THRESHOLD) {
                 await sendEmailAlert(clientIp, failedCount);
             }

        } catch (error) {
            console.error(error);
        }

        return res.status(401).json({ message: 'Unauthorized', reason });
    }

    next();
};

module.exports = validateRequest;
