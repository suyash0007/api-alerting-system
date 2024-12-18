require('dotenv').config();
const mongoose = require('mongoose');
const uri=process.env.MONGO_URI

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//mongo scehma 
const failureLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  reason: { type: String, required: true },
});

module.exports = mongoose.model('FailureLog', failureLogSchema);
