const graphql = require("graphql");
const UserProfileType = require("./userProfile.type");
const PostType = require("./post.type");
const { User } = require("../../models/user.model");
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const AllPostType = new GraphQLObjectType({
  name: "AllPost",
  fields: () => ({
    _id: { type: GraphQLID },
    posts: { type: new GraphQLList(PostType) },
    profile: {
      type: UserProfileType,
      resolve: async (parent, args) => {
        return await User.findById({ _id: parent._id });
      },
    },
  }),
});

module.exports = AllPostType;
