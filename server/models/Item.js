const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
    x : Number,
    y : Number,
    damage : String,
    piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;