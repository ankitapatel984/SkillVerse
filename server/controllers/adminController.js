const SwapRequest = require('../models/SwapRequest');
const Feedback = require('../models/Feedback');
const User = require('../models/User');

exports.getAllSwaps = async (req, res, next) => {
  try {
    const swaps = await SwapRequest.find()
                      .populate('fromUser', 'name email banned')
                      .populate('toUser', 'name email banned')
                      .sort({createdAt: -1});
    res.json(swaps);
  } catch(err){
    next(err);
  }
};

exports.getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find()
                      .populate('fromUser', 'name email banned')
                      .populate('toUser', 'name email banned')
                      .populate('swapId')
                      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch(err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    // Define report data example: number of swaps/feedbacks/banned users counts
    const bannedUsersCount = await User.countDocuments({ banned: true });
    const swapsCount = await SwapRequest.countDocuments();
    const feedbackCount = await Feedback.countDocuments();

    res.json({
      bannedUsersCount,
      swapsCount,
      feedbackCount,
    });
  } catch(err) {
    next(err);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    if(req.user.id === userId) {
      return res.status(400).json({message: 'Cannot ban yourself'});
    }
    
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message:'User not found'});

    user.banned = true;
    await user.save();

    res.json({message:'User banned'});
  } catch(err) {
    next(err);
  }
};

// Deleted skills API is ambiguous (no separate Skills model). Assuming skills are strings and deletion means removing skill from all users offering that skill.

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = req.params.id; // skill name passed as :id? Ideally skill ID, but no Skills model specified.
    
    if(!skill) return res.status(400).json({message:'Skill required in path param'});

    // Remove skill from all users skillsOffered
    await User.updateMany(
      { skillsOffered: skill },
      { $pull: { skillsOffered: skill } }
    );

    res.json({message:`Skill '${skill}' removed from all users`});
  } catch(err) {
    next(err);
  }
};

// Admin announcement (simplified as a message stored in-memory or logs; No DB specified, so will just echo message)

exports.postAnnouncement = async (req, res, next) => {
  try {
    const { message } = req.body;
    if(!message) return res.status(400).json({message:'Announcement message required'});

    // For demo, just respond back as no DB or notification system defined
    console.log('Admin Announcement:', message);

    res.json({message:'Announcement posted', announcement: message});
  } catch(err) {
    next(err);
  }
};