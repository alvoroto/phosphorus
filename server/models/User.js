const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Level = require("./Level")

const userSchema = new Schema({
  username: String,
  password: String,
  levels:[
    {type: Schema.Types.ObjectId, ref: 'Level'},
],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
