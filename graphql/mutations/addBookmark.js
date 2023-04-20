const graphql = require("graphql");
const { GraphQLID, GraphQLList } = graphql;
const { User } = require("../../models/user.model");
const { BookmarkType } = require("../types/index");

module.exports = {
  type: new GraphQLList(BookmarkType),
  args: {
    postUserId: { type: GraphQLID },
    postId: { type: GraphQLID },
  },
  resolve: async (parent, { postUserId, postId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId: loginUserId } = req.user;
      const user = await User.findById({ _id: loginUserId });
      user.bookmarks.push({ userId: postUserId, postId });
      await User.findByIdAndUpdate(
        { _id: loginUserId },
        { bookmarks: user.bookmarks }
      );
      return user.bookmarks;
    } catch (error) {
      throw new Error(error);
    }
  },
};
