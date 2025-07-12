const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const feedbackController = require('../controllers/feedbackController');
const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');

router.post('/',
  authMiddleware,
  [
    body('toUser').notEmpty().isMongoId(),
    body('swapId').notEmpty().isMongoId(),
    body('message').optional().isString(),
    body('rating').notEmpty().isInt({min:1, max:5}),
  ],
  validateMiddleware,
  feedbackController.createFeedback
);

module.exports = router;