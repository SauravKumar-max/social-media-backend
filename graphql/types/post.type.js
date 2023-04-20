const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } =
  graphql;

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    count: { type: GraphQLInt },
    likedUserId: { type: new GraphQLList(GraphQLID) },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
    likes: { type: LikeType },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = PostType;
