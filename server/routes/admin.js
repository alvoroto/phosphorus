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

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log("ou")
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})



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