const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const backgroundSchema = new Schema({
    x : Number,
    y : Number,
    piece: {type: Schema.Types.ObjectId, ref: 'Piece'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Background = mongoose.model('Background', backgroundSchema);
module.exports = Background;
