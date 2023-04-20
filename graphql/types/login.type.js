const graphql = require("graphql");
const { GraphQLString, GraphQLObjectType, GraphQLID } = graphql;

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

module.exports = LoginType;
