const updateProfileService = async (req, res, dataModel) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return {
        status: "fail",
        message: "Unauthorized. User not found in token.",
      };
    }
    const userId = user._id;
    const updateData = req.body;

    const existingProfile = await dataModel.findOne({ user_id: userId });
    if (!existingProfile) {
      return {
        status: "fail",
        message: "User profile not found. Please create one first.",
      };
    }

    const updatedProfile = await dataModel.findOneAndUpdate(
      { user_id: userId },
      updateData,
      { new: true }
    );
    return {
      status: "success",
      message: "User profile updated successfully",
      data: updatedProfile,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Failed to update user profile",
      error: err.message,
    };
  }
};
module.exports = { updateProfileService };
