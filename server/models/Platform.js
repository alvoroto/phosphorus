const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const platformSchema = new Schema({
    name: String,
    src : String,
    x : Number,
    y : Number,
    w : Number,
    h : Number,
    isDashBreakable : Boolean,
    isDownBreakable : Boolean,
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

const Platform = mongoose.model('Platform', platformSchema);
module.exports = Platform;