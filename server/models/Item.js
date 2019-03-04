const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    src : String,
    x : Number,
    y : Number,
    w : Number,
    h : Number,
    isActive : Boolean,
    damage : String,
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

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;