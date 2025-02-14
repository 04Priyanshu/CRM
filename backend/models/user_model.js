import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", CounterSchema);

const UserSchema = new mongoose.Schema(
  {
    userID:{
      type: Number,
      unique: true,
    },
    company: {
      type: String,
      default: "NAMAN FINLEASE PVT. LTD.",
    },
    product: {
      type: String,
      default: "PAYDAY LOAN",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"], // Assumes a 10-digit mobile number
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Credit", "Collection","Accounts"], // Add more roles as needed
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.userID) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "userID" }, // Find counter by name
        { $inc: { value: 1 } }, // Increment by 1
        { new: true, upsert: true } // Create if it doesn't exist
      );
      this.userID = counter.value; // Assign the incremented value
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export const User = mongoose.model("User", UserSchema);
