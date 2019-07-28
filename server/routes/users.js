var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST users details*/
router.post('/register', checkForDuplication, function (req, res, next) {
  var user = new User({
    userName: req.body.userName,
    email: req.body.email,
    EMPCode: req.body.EMPCode,
    password: User.hashPassword(req.body.password)
  });

  let promise = user.save();

  promise.then(function (doc) {
    console.log(doc);
    return res.status(201).json(doc);
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Error in Registering User.' });
  })
})

function checkForDuplication(req,res,next) {
  console.log("init");
  let promise = User.findOne({ 'EMPCode': req.body.EMPCode }).exec();
  promise.then(function (doc) {
    if (doc) {
      console.log(doc);
      return res.status(501).json({ message: 'User Already Exist.' });
    } else {
      next();
    }
  });
}

//Login
router.post('/login', function (req, res, next) {
  let promise = User.findOne({ 'EMPCode': req.body.EMPCode }).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isValid(req.body.password)) {
        //generating token
        let token = jwt.sign({ username: doc.userName }, 'secret', { expiresIn: '1hr' });

        return res.status(200).json(token);

      } else {
        return res.status(501).json({ message: 'Invalid Credentials.' })
      }
    } else {
      return res.status(501).json({ message: 'User EMPCode is not registered.' })
    }
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Some Error Occured.' });
  })
})

//Get UserName After valid Token
router.get('/username', tokenVerify, function (req, res, next) {
  return res.status(200).json(decodedtoken.username);
});

var decodedtoken = '';
function tokenVerify(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, 'secret', function (err, tokenData) {
    if (tokenData) {
      decodedtoken = tokenData;
      next();
    }
    if (err) {
      return res.status(400).status.json({ message: 'Unauthorized request' })
    }
  })
}

module.exports = router;
