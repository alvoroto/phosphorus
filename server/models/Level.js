const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const levelSchema = new Schema({
    name: String,
    platforms:[
        {type: Schema.Types.ObjectId, ref: 'Platform'},
    ],
    collectableItems:[
        {type: Schema.Types.ObjectId, ref: 'Item'},
    ],
    damageItems:[
        {type: Schema.Types.ObjectId, ref: 'Item'},
    ],
    powerItems:[
        {type: Schema.Types.ObjectId, ref: 'Item'},
    ],
    frontImages:[
        {type: Schema.Types.ObjectId, ref: 'Images'},
    ],
    backImages:[
        {type: Schema.Types.ObjectId, ref: 'Images'},
    ],
    background: {type: Schema.Types.ObjectId, ref: 'Background'},
    playerX: Number,
    playerY: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Level = mongoose.model('Level', levelSchema);
module.exports = Level;