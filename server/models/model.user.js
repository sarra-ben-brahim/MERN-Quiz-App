const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "{PATH} First name is required"],
    },
    lastName: {
      type: String,
      required: [true, " {PATH} Last name is required"],
    },
    email: {
      type: String,
      required: [true, " {PATH} Email is required"],
      unique: true,
      validate: {
        validator: (val) => /^([\w-.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: " {PATH} Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, " {PATH} Password is required"],
      minlength: [8, " {PATH} Password must be 8 characters or longer"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
// confirmPassword
UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Validate password and confirmPassword 
UserSchema.virtual("confirmPassword")
  .get(function () {
    console.log("Getting confirmPassword:", this._confirmPassword); 
    return this._confirmPassword;
  })
  .set(function (value) {
    console.log("Setting confirmPassword:", value); 
    this._confirmPassword = value;
  });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
