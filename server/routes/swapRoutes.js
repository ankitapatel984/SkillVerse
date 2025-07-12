const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const swapController = require('../controllers/swapController');
const { body, param } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');

router.post('/',
  authMiddleware,
  [
    body('toUser').notEmpty().isMongoId(),
    body('offeredSkill').notEmpty().isString(),
    body('wantedSkill').notEmpty().isString(),
    body('message').optional().isString(),
  ],
  validateMiddleware,
  swapController.createSwap
);

router.get('/me', authMiddleware, swapController.getMySwaps);

router.put('/:id',
  authMiddleware,
  [
    param('id').isMongoId(),
    body('status').optional().isIn(['pending','accepted','rejected']),
  ],
  validateMiddleware,
  swapController.updateSwap
);

router.delete('/:id',
  authMiddleware,
  [
    param('id').isMongoId()
  ],
  validateMiddleware,
  swapController.deleteSwap
);

module.exports = router;