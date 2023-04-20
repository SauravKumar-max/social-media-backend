const graphql = require("graphql");
const UserPictureType = require("./userPicture.type");
const { User } = require("../../models/user.model");
const { Post } = require("../../models/post.model");
const PostType = require("./post.type");
const { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } = graphql;

// const UserBasicInfoType = new GraphQLObjectType({
// 	name: "UserBasicInfo",
// 	fields: () => ({
// 			_id: { type: GraphQLID },
// 			name: { type: GraphQLString },
// 			username: { type: GraphQLString },
// 			picture: { type: UserPictureType },
// 	})
// })

// const BookmarkType = new GraphQLObjectType({
// 	name: "Bookmark",
// 	fields: () => ({
// 		_id: { type: GraphQLID },
// 		user: {
// 			type: UserBasicInfoType,
// 			resolve: async (parent, args) => {
// 				return await User.findById({ _id: parent. })
// 			}
// 		},
// 		post: {
// 			type: require('./post.type'),
// 			resolve: async (parent, args) => {
// 				const userPosts = await Post.findById({ _id: parent.userId });
// 				const post = userPosts.posts.find( post => post._id == parent.postId.toString());
// 				return post;
// 			}
// 		}
// 	})
// })

const BookmarkType = new GraphQLObjectType({
  name: "Bookmark",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
  }),
});

module.exports = BookmarkType;
