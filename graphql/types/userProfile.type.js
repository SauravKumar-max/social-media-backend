const graphql = require("graphql");
const UserPictureType = require("./userPicture.type");
const BookmarkType = require("./bookmark.type");
const { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } = graphql;

const UserProfileType = new GraphQLObjectType({
  name: "UserInfo",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: UserPictureType },
    bio: { type: GraphQLString },
    following: { type: new GraphQLList(GraphQLID) },
    followers: { type: new GraphQLList(GraphQLID) },
    bookmarks: { type: new GraphQLList(BookmarkType) },
  }),
});

module.exports = UserProfileType;
