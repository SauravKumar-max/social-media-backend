const graphql = require("graphql");
const { GraphQLString, GraphQLObjectType } = graphql;

const UserPictureType = new GraphQLObjectType({
  name: "picture",
  fields: () => ({
    profile: { type: GraphQLString },
    header: { type: GraphQLString },
  }),
});

module.exports = UserPictureType;
