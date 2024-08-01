import { connectToDatabase } from "../Database";
import User from "../Database/models/user.model";

export const getUserById = async (_id: string) => {
    try {
        // Connect to the database
        await connectToDatabase();

        // Find the user by ID
        const user = await User.findById(_id).lean(); 

        if (!user) {
            throw new Error(`User with ID ${_id} not found.`);
        }

        return user;
    } catch (error) {
        console.error(`Error fetching user with ID ${_id}:`, error);
        throw new Error(`Failed to fetch user data: ${error}`);
    }
};


export const getUserByUsername = async (displayName:string) => {

    await connectToDatabase();

    try {
        console.log("Searching for user with username:", displayName);
        // Find the user by username and populate the streamData field
        const user = await User.findOne({ displayName:displayName }).lean()
        
        if (!user) {
            throw new Error("User not found for username: " + displayName);
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}