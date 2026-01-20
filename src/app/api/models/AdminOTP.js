import mongoose from 'mongoose';

const AdminOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    maxAttempts: {
      type: Number,
      default: 5,
    },
    lastAttemptTime: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // Auto-delete after 5 minutes if not verified
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdminOTP || mongoose.model('AdminOTP', AdminOTPSchema);
