const FailureLog = require('../models/failureLog');
//fetching failedlogs from Db
const getMetrics = async (req, res) => {
  const { ip } = req.query;
  const filter = ip ? { ip } : {};
  try {
    const metrics = await FailureLog.find(filter);
    
  } catch (error) {
    console.err(error)
  }
  
  res.json(metrics);
};

module.exports = { getMetrics };
