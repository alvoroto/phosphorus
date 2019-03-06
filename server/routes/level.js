const express = require('express');
const router  = express.Router();
const Background = require('../models/Background');
const Images = require('../models/Images');
const Item = require('../models/Item');
const Level = require('../models/Level');
const Piece = require('../models/Piece');
const Platform = require('../models/Platform');
const User = require('../models/User');
const passport = require('passport');

router.post('/save', (req,res,next) => {
  req.body.level.creator = req.user._id

  Level.findByIdAndUpdate(req.body._id, req.body.level)
  .then(level => {
    if(!level){
      Level.create(req.body.level)
      .then(xperience => {
        User.findById(req.user._id).populate("levels")
        .then(user => {
          let arrayLevels = user.levels
          arrayLevels.push(newLevel._id)
          User.findByIdAndUpdate(req.user._id, {levels:arrayLevels})
          .then(users => {
            console.log("ok")
          })
          .catch(error => {
          console.log(error)
          });
        })
        .catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })

    }
  })
})

router.get('/new', (req, res, next)=>{
  Background.find().populate("piece")
  .then(backgrounds => {
    Images.find().populate("piece")
    .then(images => {
      Item.find().populate("piece")
      .then(items => {
        Platform.find().populate("piece")
        .then(platforms => {
          res.status(200).json({data: {backgrounds, images, items, platforms}})
        })
        .catch(err => res.status(500).json({data: err}));
      })
      .catch(err => res.status(500).json({data: err}));
    })
    .catch(err => res.status(500).json({data: err}));
  })
  .catch(err => res.status(500).json({data: err}));
});

router.get('/pieces', (req, res, next)=>{
  Piece.find({ type: req.query.type})
  .then(pieces=>{
    res.status(200).json({data: {pieces}})
  })
});


module.exports = router;