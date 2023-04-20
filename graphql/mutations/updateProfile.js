const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { UserProfileType } = require("../types/index");
const { GraphQLNonNull, GraphQLString } = graphql;

module.exports = {
  type: UserProfileType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    profile: { type: GraphQLNonNull(GraphQLString) },
    header: { type: GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { name, profile, header, bio }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token");
      }
      const { userId } = req.user;
      const newData = { name, picture: { profile, header }, bio };
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        { ...newData }
      );
      return Object.assign(updateUser, { ...newData });
    } catch (error) {
      throw new Error(error);
    }
  },
};
