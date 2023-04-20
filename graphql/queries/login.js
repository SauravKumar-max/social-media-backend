const graphql = require("graphql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mySecret = process.env["TOKEN_SECRET"];
const { User } = require("../../models/user.model");
const { LoginType } = require("../types/index");
const { GraphQLString } = graphql;

module.exports = {
  type: LoginType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("user does not exist!");
      }
      const isEqula = await bcrypt.compare(password, user.password);
      if (!isEqula) {
        throw new Error("incorrect password!");
      }
      const token = jwt.sign({ userId: user._id }, mySecret);
      return {
        _id: user._id,
        name: user.name,
        profileImage: user.picture.profile,
        token,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
