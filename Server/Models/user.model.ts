  import mongoose, { model } from "mongoose";

  type userTypes = {
    email: string;
    passwordHash: string;
    googleId: string;
    facebookId: string;
    lastGithubPushDate: Date;
    githubId: string;
    githubAccessTokenHash: string;
    profilePicture: string;
    username: string;
    refreshToken: string;
    resetPin: string;
    resetPinExpiration: Date;
    following: string[];
    follower: string[];
  };

  const userSchema = new mongoose.Schema<userTypes>({
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    googleId: String,
    facebookId: String,
    lastGithubPushDate: String,
    githubId: String,
    githubAccessTokenHash: String,
    profilePicture: String,
    username: String,
    refreshToken: String,
    resetPin: String,
    resetPinExpiration: String,
    following: {
      type: [String],
    },
    follower: [
      {
        email: {
          type: String,
          required: true,
        }
      }
    ]
  });

  const userModel = model<userTypes>("user", userSchema);
  export { userModel };
