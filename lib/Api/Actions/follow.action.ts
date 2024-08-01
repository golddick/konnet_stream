'use server'



import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../Database";
import { followUser, unFollowUser } from "../Services/follow.service";

export const onFollow = async (_id: string) => {
    await connectToDatabase(); // Ensure database connection

    try {
        const followedUser = await followUser(_id);
        revalidatePath('/');

        if (followedUser) {
            // Log the followed user's username
            console.log("Following User with id:", followedUser?.followingId);
            console.log("Followed User with id :", followedUser?.followerId);

            // Assuming `followedUser.following.username` structure is correct
            revalidatePath(`/${followedUser?.followingId}`);
        }
        if (!followedUser) {
            throw new Error("no user followed");
            
        }

        return followedUser; // Return the followed user
    } catch (error) {
        console.error("Error occurred during follow:", error); // Log the error
        throw new Error("Internal error");
    }
};

export const onUnFollow = async (_id: string) => {
    await connectToDatabase(); // Ensure database connection

    try {
        const unFollowedUser = await unFollowUser(_id);
        console.log('followedUser all', unFollowedUser)
        revalidatePath('/');

        if (unFollowedUser) {
            // Log the followed user's username
            console.log("Followed User with id:", unFollowedUser);
            console.log("Followed User with id spice:", unFollowedUser);

            // Assuming `followedUser.following.username` structure is correct
            revalidatePath(`/${unFollowedUser}`);
        }
        if (!unFollowedUser) {
            throw new Error("no user followed");
            
        }

        return unFollowedUser; 
    } catch (error) {
        console.error("Error occurred during follow:", error); // Log the error
        throw new Error("Internal error");
    }
};

