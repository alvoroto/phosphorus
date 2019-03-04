const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const backgroundSchema = new Schema({
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

const Background = mongoose.model('Background', backgroundSchema);
module.exports = Background;
