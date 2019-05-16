const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route POST api/auth
// @desc  Auth User
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  
  // Simple Validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' });
  }

  // Check for existing user
  User
    .findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist!' });

      // Validate User
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials!' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                },
                token
              });
            }
          );
        });
    });
});


// @route GET api/auth/user
// @desc  Get User Data
// @access Protected
router.get('/user', auth, (req, res) => {
  User
    .findById(req.user.id)
    .select('-password') // '-' disregards the password from being sent
    .then(user => res.json(user));
});

module.exports = router;