const { body, validationResult } = require('express-validator');

module.exports = {
  signInRules: [
    body('username').notEmpty().withMessage('Username cannot be empty'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
    (req, res, next) => {
      const validate = validationResult(req);
      if (validate.isEmpty()) {
        return next();
      }
      // const msg = validate.array().reduce((a, b) => a.msg + ', ' + b.msg);
      return res.status(422).json({ message: validate.array() });
    },
  ],
  signUpUser: [
    body('username').notEmpty().isLength(8)
  ]
};
