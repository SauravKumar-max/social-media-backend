const { User } = require("../../models/user.model");
const { UserProfileType } = require("../types/index");

module.exports = {
  type: UserProfileType,
  resolve: async (parent, args, req) => {
    try {
      if (!req.auth) {
        throw new Error("Invalid Token!");
      }
      const { userId } = req.user;
      return await User.findById({ _id: userId });
    } catch (error) {
      throw new Error(error);
    }
  },
};
