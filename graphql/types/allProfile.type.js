const graphql = require("graphql");
const { UserProfileType } = require("../types/index");
const { GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

const AllProfileType = new GraphQLObjectType({
  name: "AllProfile",
  fields: () => ({
    currentUser: { type: GraphQLID },
    profiles: new GraphQLList(UserProfileType),
  }),
});

module.exports = AllProfileType;
