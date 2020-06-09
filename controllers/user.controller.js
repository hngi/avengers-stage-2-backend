const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

//Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

exports.registerUser = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { username, email, password } = req.body

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json({ errors })
    } else {
      const newUser = new User({
        username,
        email,
        password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user =>
              res
                .status(200)
                .json({ message: 'Registered Successfully', data: user })
            )
            .catch(err => console.log(err))
        })
      })
    }
  })
}

exports.loginUser = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body)

  //Check if the login is valid
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { username, email, password } = req.body

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(423).send('User does not exist, kindly register!!')
    }

    bcrypt
      .compare(password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(403).send('Incorrect username or password')
        }

        const token = jwt.sign(
          {
            username,
            email,
            password
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '4800s'
          }
        )

        return res.status(200).send({
          message: `Welcome back`,
          _id: user._id,
          token
        })
      })
      .catch(err => console.log(err))
  })
}
