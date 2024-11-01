import mongoose from "mongoose";
// import { isEmail } from "validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Username already taken"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      // validate: [isEmail, "The email entered is invalid"],
      unique: [true, "Email already taken"],
      createIndexes: { unique: true },
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
