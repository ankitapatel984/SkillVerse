const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  offeredSkill: {type: String, required:true},
  wantedSkill: {type: String, required:true},
  message: {type:String},
  status: {type:String, enum:['pending','accepted','rejected'], default:'pending'},
  createdAt: {type: Date, default: Date.now},
});

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
module.exports = SwapRequest;