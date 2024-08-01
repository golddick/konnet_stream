import { connectToDatabase } from "../Database";
import Blocked from "../Database/models/blockuser.model";
import User from "../Database/models/user.model";
import { getLoginUser } from "./auth.service";

export const isBlockedByUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            // throw new Error("User not found");
            console.log('no users')
        }

        const otherUser = await User.findById(_id).lean();

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id === loggedInUser._id) {
            return false
        }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOne({
            blockerId: otherUser._id.toString(),
            blockedId: loggedInUser?._id
        }).lean();

        return !!existingBlock


    } catch (error) {
        console.error("Error occurred while blocking user:", error);
        throw error;
    }
};




export const blockUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

        const otherUser = await User.findById(_id).lean();

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id === loggedInUser._id) {
            throw new Error("You cannot block yourself");
        }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOne({
            blockerId: otherUser._id,
            blockedId: loggedInUser._id
        }).lean();

        if (existingBlock) {
            throw new Error("User is already blocked");
        }

        // Create a new block
        const block = await Blocked.create({ blockerId: otherUser._id.toString(), blockedId: loggedInUser._id })


        const updatedBlockedLoggedInUser = await User.findByIdAndUpdate(loggedInUser._id, { $addToSet: { blockedBy: otherUser._id.toString() } }, { new: true });

        // Update the blocked array for the other user
        const updatedBlockedOtherUser = await User.findByIdAndUpdate(otherUser._id.toString(), { $addToSet: { blocked: loggedInUser._id } }, { new: true });
           

        return block;
    } catch (error) {
        console.error("Error occurred while blocking user:", error);
        throw error;
    }
};




export const unblockUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) { 
            throw new Error("User not found");
        }

        const otherUser = await User.findById(_id);

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id === loggedInUser._id) {
            throw new Error("You cannot unblock yourself");
        }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOneAndDelete({
            blockerId: otherUser._id,
            blockedId: loggedInUser._id
        });

        if (!existingBlock) {
            throw new Error("User is not blocked");
        }

        return existingBlock;
    } catch (error) {
        console.error("Error occurred while unblocking user:", error);
        throw error;
    }
};
