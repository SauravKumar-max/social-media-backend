const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const BookmarkSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId },
  postId: { type: Schema.Types.ObjectId },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "email already exists!"],
      index: { unique: true },
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: [true, "username already exists!"],
      required: true,
      default: "",
    },

    picture: {
      profile: {
        type: String,
        default:
          "https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg",
      },

      header: {
        type: "String",
        default: "",
      },
    },

    bio: {
      type: String,
      default: "",
    },

    following: [{ type: Schema.Types.ObjectId }],

    followers: [{ type: Schema.Types.ObjectId }],

    bookmarks: [BookmarkSchema],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
