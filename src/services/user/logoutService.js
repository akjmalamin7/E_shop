const logoutService = async (req, res) => {
  const token = req.cookies.token;
  try {

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized. No user logged in.",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully.",
    });

  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Logout failed.",
      error: err.message,
    });
  }
};

module.exports = { logoutService };
