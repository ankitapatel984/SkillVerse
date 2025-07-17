// File: controllers/swapController.js
//const asyncHandler = require('express-async-handler');
const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// POST /api/swaps - Create a swap request
const createSwapRequest = async (req, res) => {
  const { toUser, offeredSkill, wantedSkill, message } = req.body;

  if (toUser.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot send swap request to yourself');
  }

  const recipient = await User.findById(toUser);
  if (!recipient || recipient.banned) {
    res.status(404);
    throw new Error('Recipient user not found or banned');
  }
  if (recipient.profileVisibility === 'private') {
    res.status(403);
    throw new Error('Recipient profile is private');
  }

  const swap = await SwapRequest.create({
    fromUser: req.user._id,
    toUser,
    offeredSkill,
    wantedSkill,
    message: message || '',
    status: 'pending',
  });

  res.status(201).json(swap);
};

// GET /api/swaps/me - Get all swap requests related to current user
const getMySwaps = async (req, res) => {
  const sentSwaps = await SwapRequest.find({ fromUser: req.user._id })
  .populate('fromUser', 'name profilePhoto') .sort({ createdAt: -1 });
  const receivedSwaps = await SwapRequest.find({ toUser: req.user._id })
  .populate('toUser', 'name profilePhoto') .sort({ createdAt: -1 });
  res.json({sentSwaps,receivedSwaps});
};

// PUT /api/swaps/:id - Update swap request status or message
const updateSwapRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const swap = await SwapRequest.findById(id);
  if (!swap) {
    res.status(404);
    throw new Error('Swap request not found');
  }

  // Only fromUser or toUser can update
  if (
    req.user._id.toString() !== swap.fromUser.toString() &&
    req.user._id.toString() !== swap.toUser.toString()
  ) {
    res.status(403);
    throw new Error('Not authorized to update this swap request');
  }

  if (status) {
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status value');
    }
    // Only recipient can accept or reject
    if (['accepted', 'rejected'].includes(status)) {
      if (req.user._id.toString() !== swap.toUser.toString()) {
        res.status(403);
        throw new Error('Only recipient can accept or reject the swap request');
      }
      if (swap.status !== 'pending') {
        res.status(400);
        throw new Error('Swap request has already been processed');
      }
    }
    swap.status = status;
  }
  await swap.save();

  res.json({ message: 'Swap updated.' });
};

// DELETE /api/swaps/:id - Delete swap request
const deleteSwapRequest = async (req, res) => {
  const { id } = req.params;

  const swap = await SwapRequest.findById(id);
  if (!swap) {
    res.status(404);
    throw new Error('Swap request not found');
  }

  // Only fromUser or toUser can delete
  if (
    req.user._id.toString() !== swap.fromUser.toString() &&
    req.user._id.toString() !== swap.toUser.toString()
  ) {
    res.status(403);
    throw new Error('Not authorized to delete this swap request');
  }

  await swap.remove();
  res.json({ message: 'Swap deleted.' });
};

module.exports = {
  createSwapRequest,
  getMySwaps,
  updateSwapRequest,
  deleteSwapRequest,
};