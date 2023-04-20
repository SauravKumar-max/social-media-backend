const graphql = require("graphql");
const { Post } = require("../../models/post.model");
const { CommentType } = require("../types/index");
const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(CommentType),
  args: {
    postUserId: { type: GraphQLID },
    postId: { type: GraphQLID },
  },
  resolve: async (parent, { postUserId, postId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const userPost = await Post.findById({ _id: postUserId });
      const post = userPost.posts.find((post) => post._id == postId);
      return post.comments;
    } catch (error) {
      throw new Error(error);
    }
  },
};
