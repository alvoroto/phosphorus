const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("./User")
const Platform = require("./Platform")
const Item = require("./Item")
const Images = require("./Images")
const Background = require("./Background")
const Piece = require("./Piece")

const levelSchema = new Schema({
    name: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    platforms:[
        { 
            x : Number,
            y : Number,
            isDashBreakable : Boolean,
            isDownBreakable : Boolean,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        }
    ],
    collectableItems:[
        {
            x : Number,
            y : Number,
            damage : String,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        }
    ],
    damageItems:[
        {
            x : Number,
            y : Number,
            damage : String,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        }
    ],
    powerItems:[
        {
            x : Number,
            y : Number,
            damage : String,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        }
    ],
    frontImages:[
        { 
            x : Number,
            y : Number,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        },
    ],
    backImages:[
        { 
            x : Number,
            y : Number,
            piece: {type: Schema.Types.ObjectId, ref: 'Piece'}
        },
    ],
    background: { 
        x : Number,
        y : Number,
    },
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