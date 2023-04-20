const graphql = require("graphql");
const { Post } = require("../../models/post.model");
const { PostType } = require("../types/index");
const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

module.exports = {
  type: PostType,
  args: {
    postUserId: { type: GraphQLNonNull(GraphQLID) },
    postId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, { postId, postUserId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId } = req.user;
      const userPost = await Post.findById({ _id: postUserId });

      const updatePost = userPost.posts.map((post) =>
        post._id == postId
          ? {
              ...post.toObject(),
              likes: {
                ...post.likes,
                count: post.likes.count + 1,
                likedUserId: [...post.likes.likedUserId, userId],
              },
            }
          : post
      );

      await Post.findByIdAndUpdate({ _id: postUserId }, { posts: updatePost });
      return updatePost.find((post) => post._id == postId);
    } catch (error) {
      throw new Error(error);
    }
  },
};
