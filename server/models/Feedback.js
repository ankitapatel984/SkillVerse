const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  fromUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  swapId: {type: mongoose.Schema.Types.ObjectId, ref:'SwapRequest', required:true},
  message: {type:String},
  rating: {type:Number, min:1, max:5, required:true},
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;