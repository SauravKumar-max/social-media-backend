const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },

    commentUserId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const UserPostSchema = new mongoose.Schema({
  text: {
    type: String,
  },

  image: {
    type: String,
  },

  likes: {
    count: {
      type: Number,
      default: 0,
    },

    likedUserId: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },

  comments: [CommentSchema],

  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },

    posts: [UserPostSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
