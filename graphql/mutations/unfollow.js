const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

module.exports = {
  type: new GraphQLList(GraphQLID),
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
      const follwingUser = await User.findById({ _id: followingId });
      const removeFollowing = user.following.filter((id) => id != followingId);
      const removeFollower = follwingUser.following.filter(
        (id) => id != userId
      );
      await User.findByIdAndUpdate(
        { _id: userId },
        { following: removeFollowing }
      );
      await User.findByIdAndUpdate(
        { _id: followingId },
        { followers: removeFollower }
      );
      return removeFollowing;
    } catch (error) {
      throw new Error(error);
    }
  },
};
