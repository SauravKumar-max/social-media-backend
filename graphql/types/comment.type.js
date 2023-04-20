const graphql = require("graphql");
const { User } = require("../../models/user.model");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserProfileType = require("./userProfile.type");

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    _id: { type: GraphQLID },
    text: { type: GraphQLString },
    commentUser: {
      type: UserProfileType,
      resolve: async (parent, args) => {
        return await User.findById({ _id: parent.commentUserId });
      },
    },
  }),
});

module.exports = CommentType;
