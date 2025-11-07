import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
    },
    city: {
      type: String,
      default: "Unknown",
    },
    region: {
      type: String,
      default: "Unknown",
    },
    country: {
      type: String,
      default: "Unknown",
      index: true,
    },
    countryCode: {
      type: String,
      default: "Unknown",
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    timezone: {
      type: String,
      default: "Unknown",
    },
    userAgent: {
      type: String,
      default: "Unknown",
    },
    referrer: {
      type: String,
      default: "Direct",
    },
    sessionId: {
      type: String,
      index: true,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
  },
  { 
    timestamps: true,
    collection: "visitors"
  }
);

// Compound index for better query performance
VisitorSchema.index({ ip: 1, createdAt: -1 });
VisitorSchema.index({ country: 1, createdAt: -1 });

// Method to update visit count
VisitorSchema.methods.incrementVisit = function() {
  this.visitCount += 1;
  this.lastVisit = new Date();
  return this.save();
};

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
