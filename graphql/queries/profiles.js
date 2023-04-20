const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { UserType } = require("../types/index");
const { GraphQLList } = graphql;

module.exports = {
  type: new GraphQLList(UserType),
  resolve: async (parent, { profileId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      return await User.find({});
    } catch (error) {
      throw new Error(error);
    }
  },
};
