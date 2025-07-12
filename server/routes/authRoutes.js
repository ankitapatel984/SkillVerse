const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

router.post('/signup',
  [
    body('email').isEmail().withMessage("Invalid email"),
    body('name').notEmpty().withMessage("Name required"),
    body('password').isLength({min:6}).withMessage("Password min 6 chars"),
  ],
  validateMiddleware,
  authController.signup
);

router.post('/login',
  [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').notEmpty().withMessage("Password required")
  ],
  validateMiddleware,
  authController.login
);

router.post('/logout', authController.logout);

router.get('/me', authMiddleware, authController.getMe);

module.exports = router;