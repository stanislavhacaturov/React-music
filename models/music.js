const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let allMusic = new Schema(
  {
    song: {
      type: String,
      required: true,
      unique: true,
    },
  },
);

allMusic.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('AllMusic', allMusic);