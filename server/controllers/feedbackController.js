const Feedback = require('../models/Feedback');
const SwapRequest = require('../models/SwapRequest');

exports.createFeedback = async (req, res, next) => {
  try {
    const { toUser, swapId, message, rating } = req.body;

    if(!toUser || !swapId || !rating) {
      return res.status(400).json({message:'toUser, swapId and rating are required'});
    }

    if(rating < 1 || rating > 5) {
      return res.status(400).json({message:'Rating must be between 1 and 5'});
    }

    // Validate swap belongs to user and toUser
    const swap = await SwapRequest.findById(swapId);
    if(!swap) return res.status(404).json({message:'Swap not found'});

    // fromUser of feedback must be req.user
    if(swap.fromUser.toString() !== req.user.id && swap.toUser.toString() !== req.user.id) {
      return res.status(403).json({message:'You are not a participant of the swap'});
    }

    // toUser must be the other user in the swap
    if(toUser !== swap.fromUser.toString() && toUser !== swap.toUser.toString()) {
      return res.status(400).json({message:'toUser must be participant of swap'});
    }

    // Prevent user from giving feedback to self
    if(req.user.id === toUser) {
      return res.status(400).json({message:'Cannot give feedback to self'});
    }

    const existing = await Feedback.findOne({ swapId, fromUser: req.user.id });
    if(existing) return res.status(400).json({message:'Feedback already given for this swap'});

    const feedback = await Feedback.create({
      fromUser: req.user.id,
      toUser,
      swapId,
      message,
      rating,
    });

    res.status(201).json(feedback);
  } catch(err) {
    next(err);
  }
};