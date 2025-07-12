const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');
const { body, param } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/swaps', adminController.getAllSwaps);
router.get('/feedbacks', adminController.getAllFeedbacks);
router.get('/reports', adminController.getReports);

router.put('/users/:id/ban',
  param('id').isMongoId(),
  validateMiddleware,
  adminController.banUser
);

router.delete('/skills/:id',
  param('id').isString(),
  validateMiddleware,
  adminController.deleteSkill
);

router.post('/announcement',
  body('message').notEmpty().isString(),
  validateMiddleware,
  adminController.postAnnouncement
);

module.exports = router;