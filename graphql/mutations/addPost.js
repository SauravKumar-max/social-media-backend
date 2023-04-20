const graphql = require("graphql");
const { PostType } = require("../types/index");
const { Post } = require("../../models/post.model");
const { GraphQLString, GraphQLNonNull } = graphql;

module.exports = {
  type: PostType,
  args: {
    text: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { text, image }, req) => {
    if (!req.auth) {
      throw new Error("Invalid Token!");
    }
    const { userId } = req.user;
    const userPost = await Post.findOne({ _id: userId });
    if (!userPost) {
      const newPost = { _id: userId, posts: [{ text, image }] };
      const AddNewPost = new Post(newPost);
      const saveUser = await AddNewPost.save();
      return saveUser.posts[0];
    }
    userPost.posts.push({ text, image });
    await Post.findByIdAndUpdate({ _id: userId }, { posts: userPost.posts });
    return userPost.posts[userPost.posts.length - 1];
  },
};
