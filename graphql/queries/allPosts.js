const graphql = require("graphql");
const { AllPostType } = require("../types/index");
const { Post } = require("../../models/post.model");
const { GraphQLList, GraphQLString } = graphql;

module.exports = {
  type: new GraphQLList(AllPostType),
  resolve: async (parent, args, req) => {
    try {
      // if (!req.auth) {
      // 	throw new Error('Invalid Token!');
      // }
      return await Post.find();
    } catch (error) {
      throw new Error(error);
    }
  },
};
