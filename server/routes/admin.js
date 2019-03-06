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

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');


//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
    
    res.json({url: req.file.url});
  
});



router.post('/newPiece', (req,res,next) => {
    Piece.findByIdAndUpdate(req.body._id, req.body.piece)
    .then(piece => {
        if(!piece){
            Piece.create(req.body)
            .then(newPiece => {
                console.log("created piece")
                console.log(newPiece)
                res.status(200).json(newPiece);
            }).catch(error => {
              console.log(error)
            })
        }
    })
});

module.exports = router;