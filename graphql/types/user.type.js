const graphql = require("graphql");
const { Post } = require("../../models/post.model");
const PostType = require("./post.type");
const UserPictureType = require("./userPicture.type");
const BookmarkType = require("./bookmark.type");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    picture: { type: UserPictureType },
    email: { type: GraphQLString },
    bio: { type: GraphQLString },
    following: { type: new GraphQLList(GraphQLID) },
    followers: { type: new GraphQLList(GraphQLID) },
    bookmarks: { type: new GraphQLList(BookmarkType) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent, args) => {
        try {
          const userPost = await Post.findById({ _id: parent._id });
          return userPost ? userPost.posts : [];
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  }),
});

module.exports = UserType;
