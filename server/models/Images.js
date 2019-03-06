const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imagesSchema = new Schema({
    x : Number,
    y : Number,
    piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Images = mongoose.model('Images', imagesSchema);
module.exports = Images;