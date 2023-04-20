const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLList } = graphql;
const { Post } = require("../../models/post.model");
const { CommentType } = require("../types/index");

module.exports = {
  type: new GraphQLList(CommentType),
  args: {
    postUserId: { type: GraphQLID },
    postId: { type: GraphQLID },
    commentId: { type: GraphQLID },
  },
  resolve: async (parent, { postUserId, postId, commentId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const userPost = await Post.findById({ _id: postUserId });
      const deleteComment = userPost.posts.map((post) =>
        post._id == postId
          ? {
              ...post._doc,
              comments: post._doc.comments.filter(
                (comment) => comment._id != commentId
              ),
            }
          : post
      );
      await Post.findByIdAndUpdate(
        { _id: postUserId },
        { posts: deleteComment }
      );
      return [];
    } catch (error) {
      console.log(error);
    }
  },
};
