const readProfileService = async (req, res, dataModel) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return {
        status: "fail",
        message: "Unauthorized. User not found in token.",
      };
    }

    const userId = user._id;
    const profile = await dataModel.findOne({ user_id: userId });
    if (!profile) {
      return {
        status: "fail",
        message: "User profile not found",
      };
    }
    return {
      status: "success",
      message: "User profile fetched successfully.",
      data:profile
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to fetch user profile.",
      error: err.message,
    };
  }
};
module.exports = { readProfileService };
