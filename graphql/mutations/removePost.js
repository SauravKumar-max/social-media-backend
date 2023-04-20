const graphql = require("graphql");
const { GraphQLID, GraphQLList } = graphql;
const { Post } = require("../../models/post.model.js");
const { PostType } = require("../types/index");

module.exports = {
  type: new GraphQLList(PostType),
  args: {
    postId: { type: GraphQLID },
  },
  resolve: async (parent, { postId }, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId } = req.user;
      const userPost = await Post.findById({ _id: userId });
      const updatedPost = userPost.posts.filter((post) => post._id != postId);
      await Post.findByIdAndUpdate({ _id: userId }, { posts: updatedPost });
      return updatedPost;
    } catch (error) {
      throw new Error(error);
    }
  },
};
