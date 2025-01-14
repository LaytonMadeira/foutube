// Video Document Schema
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: {type:String, required: true},
  // add char limit?
  description: {type:String, required: true},
  fileRef: {type: Schema.Types.ObjectId, ref:'GridFSFile', required: true},
  uploadDate: {type: Date, default: Date.now},
  //TODO
  //comments
  //views
  //likes
});

// export schema
const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
