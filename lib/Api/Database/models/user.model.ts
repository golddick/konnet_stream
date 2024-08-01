import mongoose, { Schema, model, Document, models, Model } from "mongoose";
import { IStreamProps } from "./streamData.models";
import StreamData from "./streamData.models";
// import StreamData, { IStreamProps } from "./streamData.models";
// import { IFollow } from "./follow.models";

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    email: string;
    displayName: string;
    password: string;
    bio: string;
    isLive?:boolean;
    isAdmin:boolean
    firstName?: string;
    imageUrl: string;
    followers:mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    blocked:string[];
    blockedBy:string[];
    streamData:IStreamProps[];
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    firstName: { type: String, },
    imageUrl: { type: String, },
    isLive: { type: Boolean, default: false }, 
    isAdmin: { type: Boolean, default: false }, 
    bio: { type: String, default: "" }, 
    followers: [{ type: Schema.Types.ObjectId,  default:false}], 
    following: [{type: Schema.Types.ObjectId,   default:false }], 
    blocked: [{ type: String, ref: 'Blocked', default: false }] ,
    blockedBy: [{ type:String, ref: 'Blocked', default: false }], 
    streamData: [{ type: Array, ref: 'StreamData', default: [] }],
});

// const User = models.User || model('User', UserSchema)

// Define User model, handle case where model is already defined
let User: Model<IUser>;
try {
  User = mongoose.model<IUser>('User');
} catch (error) {
  User = mongoose.model<IUser>('User', UserSchema);
}


export default User;
