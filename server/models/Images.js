const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imagesSchema = new Schema({
    name: String,
    src : String,
    x : Number,
    y : Number,
    w : Number,
    h : Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Images = mongoose.model('Images', imagesSchema);
module.exports = Images;