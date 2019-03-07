const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Piece = require("./Piece")

const platformSchema = new Schema({
    x : Number,
    y : Number,
    isDashBreakable : Boolean,
    isDownBreakable : Boolean,
    piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Platform = mongoose.model('Platform', platformSchema);
module.exports = Platform;