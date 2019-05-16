const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersMusic = new Schema(
  {
    song: {
      type: String,
      required: true,
      unique: true,
    },
    autor: {
        type: String,
        required: true
      }
  },
  {
    timestamps: true
  }
);

usersMusic.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('usersMusic', usersMusic);