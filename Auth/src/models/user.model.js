import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  fullname: {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [20, "First name must be at most 20 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [20, "Last name must be at most 20 characters long"],
    },
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
