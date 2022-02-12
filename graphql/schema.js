const graphqL = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = graphqL;
const { 
	profiles,
	currentUser,
	login,
	comments } = require('./queries/index');

const {
	singup, 
	addPost, 
	follow, 
	updateProfile,
	unfollow,
	addLike,
	removeLike,
	addComment,
	searchUser,
	addBookmark,
	removeBookmark,
	removePost } = require('./mutations/index');

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		login,
		profiles,
		currentUser,
		comments,
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutatoin",
	fields: {
		singup,
		addPost,
		follow,
		unfollow,
		updateProfile,
		addLike,
		removeLike,
		addComment,
		searchUser,
		addBookmark,
		removeBookmark,
		removePost
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
