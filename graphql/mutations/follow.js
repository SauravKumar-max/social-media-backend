const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(GraphQLString),
  args: {
    followingId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, { followingId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId } = req.user;
      const user = await User.findById({ _id: userId });
      const followingUser = await User.findById({ _id: followingId });
      const newFollowing = [...user.following, followingId];
      const newFollowers = [...followingUser.followers, userId];
      await User.findByIdAndUpdate(
        { _id: userId },
        { following: newFollowing }
      );
      await User.findByIdAndUpdate(
        { _id: followingId },
        { followers: newFollowers }
      );
      return newFollowing;
    } catch (error) {
      throw new Error(error);
    }
  },
};
