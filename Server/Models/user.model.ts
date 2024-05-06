  import mongoose, { model } from "mongoose";

  type userTypes = {
    username:string
    email: string;
    passwordHash: string;
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
    username: {
      type: String,
      required:true 
    }
  });
 
  const userModel = model<userTypes>("user", userSchema);
  export { userModel };
