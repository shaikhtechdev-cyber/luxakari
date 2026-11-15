import mongoose, { Schema, type Model } from "mongoose";

/**
 * Amanavest user accounts (shared with the Amanavest2.0 app — same MongoDB
 * database, "users" collection). Amanavest owns this schema: only the fields
 * Luxakari reads are declared here and strict is off so nothing else is
 * touched or stripped. Accounts are created/managed in Amanavest, not here.
 */
export interface IAmanavestUser {
  userid: string;
  name?: string;
  email: string;
  password: string;
  type: string;
  status: string;
  title?: string;
  deleted?: boolean;
  lastlogin?: string;
}

const userSchema = new Schema<IAmanavestUser>(
  {
    userid: String,
    name: String,
    email: String,
    password: String,
    type: String,
    status: String,
    title: String,
    deleted: Boolean,
    lastlogin: String,
  },
  { collection: "users", strict: false },
);

export const User: Model<IAmanavestUser> =
  (mongoose.models.User as Model<IAmanavestUser>) || mongoose.model<IAmanavestUser>("User", userSchema);
