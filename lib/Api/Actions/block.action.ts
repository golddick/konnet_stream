'use server'



import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../Database";
import { blockUser, unblockUser } from "../Services/block.service";

export const onBlockUser = async (_id: string) => {
    await connectToDatabase(); 

    try {
        const blockedTheUser = await blockUser(_id);
        console.log(' blocked User', blockedTheUser)
        // revalidatePath('/');
        if (blockedTheUser) {
           
            console.log("Followed User with id:", blockedTheUser?.blockedId);
            console.log("Followed User with id spice:", blockedTheUser?.blockerId);

       
            revalidatePath(`/${blockedTheUser?.blockedId}`);
        }

        if (!blockedTheUser) {
            throw new Error("no user blocked");
            
        }

        return blockedTheUser; // Return the followed user
    } catch (error) {
        console.error("Error occurred during follow:", error); // Log the error
        throw new Error("Internal error");
    }
};

export const onUnBlockUser = async (_id: string) => {
    await connectToDatabase(); // Ensure database connection

    try {
        const unblockTheUser = await unblockUser(_id);
        console.log('followedUser all', unblockUser)
        revalidatePath('/');

        if (unblockTheUser) {
            // Log the followed user's username
            console.log("Followed User with id:", unblockTheUser?.blockerId);
            console.log("Followed User with id spice:", unblockTheUser?.blockedId);

            // Assuming `followedUser.following.username` structure is correct
            revalidatePath(`/${unblockTheUser}`);
        }
        if (!unblockTheUser) {
            throw new Error("no user followed");
            
        }

        return unblockTheUser; 
    } catch (error) {
        console.error("Error occurred during follow:", error); // Log the error
        throw new Error("Internal error");
    }
};

