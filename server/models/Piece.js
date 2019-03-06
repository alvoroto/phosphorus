const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pieceSchema = new Schema({
    name: String,
    src : String,
    type: {type: String, enum: ['BACK', 'FRONT', 'IMG', 'PLATFORM','ITEM', 'PLAYER']},
    w : Number,
    h : Number,
    frames : Number,
    framesTo : Number,
    framesFrom : Number,
    framesIndex : Number,
    framesX : Number,
    framesY : Number,
    framesW : Number,
    framesH : Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Piece = mongoose.model('Piece', pieceSchema);
module.exports = Piece;