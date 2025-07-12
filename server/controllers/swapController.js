const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

exports.createSwap = async (req, res, next) => {
  try {
    const { toUser, offeredSkill, wantedSkill, message } = req.body;
    // Check users exist and provided skill validation
    if(!toUser || !offeredSkill || !wantedSkill){
      return res.status(400).json({message:'toUser, offeredSkill, and wantedSkill are required'});
    }

    // Check toUser exists and not banned
    const targetUser = await User.findById(toUser);
    if(!targetUser || targetUser.banned){
      return res.status(404).json({message:'Target user not found or banned'});
    }

    const swapRequest = await SwapRequest.create({
      fromUser: req.user._id,
      toUser,
      offeredSkill,
      wantedSkill,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Swap request created successfully",
      swapRequest});
  } catch(err) {
    next(err);
  }
};

exports.getMySwaps = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const swaps = await SwapRequest.find({
      $or: [{fromUser: userId}, {toUser: userId}]
    })
      .populate('fromUser','name skillsOffered')
      .populate('toUser','name skillsOffered')
      .sort({createdAt:-1});

    res.json(swaps);
  } catch(err) {
    next(err);
  }
};

exports.updateSwap = async (req, res, next) => {
  try {
    const swapId = req.params.id;
    const userId = req.user._id;
    const allowedStatus = ['pending','accepted','rejected'];

    const updateData = {};
    if(req.body.status){
      if(!allowedStatus.includes(req.body.status)){
        return res.status(400).json({message:'Invalid status value'});
      }
      updateData.status = req.body.status;
    }

    const swap = await SwapRequest.findById(swapId);
    if(!swap) return res.status(404).json({message:'Swap not found'});

    // Only fromUser or toUser can update (and admins if you want, but spec doesn't say)
    if(swap.fromUser.toString() !== userId.toString() && swap.toUser.toString() !== userId.toString()){
      return res.status(403).json({message:'Forbidden'});
    }

    const updatedSwap = await SwapRequest.findByIdAndUpdate(swapId, updateData, {new:true});
    res.json(updatedSwap);
  } catch(err) {
    next(err);
  }
};

exports.deleteSwap = async (req, res, next) => {
  try {
    const swapId = req.params.id;
    const userId = req.user._id;

    const swap = await SwapRequest.findById(swapId);
    if(!swap) return res.status(404).json({message:'Swap not found'});

    if(swap.fromUser.toString() !== userId.toString() && req.user.role !== 'admin'){
      return res.status(403).json({message:'Forbidden'});
    }

    await swap.remove();
    res.json({message:'Swap deleted'});
  } catch(err) {
    next(err);
  }
};