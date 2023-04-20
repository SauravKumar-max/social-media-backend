const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLList } = graphql;
const { User } = require("../../models/user.model");
const { BookmarkType } = require("../types/index");

module.exports = {
  type: new GraphQLList(BookmarkType),
  args: {
    bookmarkId: { type: GraphQLID },
  },
  resolve: async (parent, { bookmarkId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId } = req.user;
      const user = await User.findById({ _id: userId });
      const updatedBookmark = user.bookmarks.filter(
        (bookmark) => bookmark._id != bookmarkId
      );
      await User.findByIdAndUpdate(
        { _id: userId },
        { bookmarks: updatedBookmark }
      );
      return updatedBookmark;
    } catch (error) {
      throw new Error(error);
    }
  },
};
