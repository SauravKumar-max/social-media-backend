const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { UserProfileType } = require("../types/index");
const { GraphQLString, GraphQLNonNull, GraphQLList } = graphql;

module.exports = {
  type: new GraphQLList(UserProfileType),
  args: {
    searchInput: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { searchInput }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }

      if (searchInput === "") {
        return [];
      }

      const users = await User.find({});
      searchInput = searchInput.toLowerCase();
      const searchByName = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput)
      );
      const searchByUsername = users.filter((user) =>
        user.username.toLowerCase().includes(searchInput)
      );
      const searchResult = [...searchByName, ...searchByUsername];
      const removeDuplicateUsers = [...new Set(searchResult)];
      return removeDuplicateUsers;
    } catch (error) {
      throw new Error(error);
    }
  },
};
