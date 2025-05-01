const createProfileService = async (req, res, dataModel) => {
  try {
    const user = req.user;
    if(!user || !user._id){
      return{
        status:"fail",
        message:"Unauthorized. User not found in token."
      }
    }
    const userId = user._id;
    const profileData = req.body;

    const existingProfile = await dataModel.findOne({user_id:userId});
    if(existingProfile){
      return{
        status:"fail",
        message:"User profile already exists"
      }
    }
    profileData.user_id = userId;
    const result = await dataModel(profileData);
    const data = await result.save();

    return{
      status:"success",
      message:"User profile created successfully",
      data:data
    }

  } catch (err) {
    return{
      status:"fail",
      message:"Failed to create user profile",
      error: err.message,
    }
  }
};
module.exports = { createProfileService };
