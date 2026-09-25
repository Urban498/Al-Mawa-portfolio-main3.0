import mongoose from "mongoose";

const Opt_schema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  company: { type: String, required: true },
  hasWebsite: { type: String, required: true },
  location: { type: String, required: true },
  message: { type: String, required: true },
});

export const OptModel = mongoose.models.opt || mongoose.model("opt", Opt_schema);