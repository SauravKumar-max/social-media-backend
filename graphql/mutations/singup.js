const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { UserProfileType } = require("../types/index");
const { GraphQLNonNull, GraphQLString } = graphql;

module.exports = {
  type: UserProfileType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    name: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { email, password, name, username }) => {
    try {
      let newUser = await User({
        email,
        password,
        name,
        username,
      });
      return newUser.save();
    } catch (error) {
      throw new Error(error);
    }
  },
};
