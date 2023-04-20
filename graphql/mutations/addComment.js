const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLList } = graphql;
const { Post } = require("../../models/post.model");
const { CommentType } = require("../types/index");

module.exports = {
  type: new GraphQLList(CommentType),
  args: {
    postId: { type: GraphQLID },
    postUserId: { type: GraphQLID },
    text: { type: GraphQLString },
  },
  resolve: async (parent, { postId, postUserId, text }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId: commentUserId } = req.user;
      const userPost = await Post.findById({ _id: postUserId });

      const addCommentInPost = userPost.posts.map((post) =>
        post._id == postId
          ? {
              ...post.toObject(),
              comments: [...post.comments, { text, commentUserId }],
            }
          : post
      );
      const updatedPost = await Post.findByIdAndUpdate(
        { _id: postUserId },
        { posts: addCommentInPost }
      );
      return updatedPost.posts.find((post) => post._id == postId).comments;
    } catch (error) {
      throw new Error(error);
    }
  },
};
