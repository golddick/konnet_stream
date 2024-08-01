'use server'



import { revalidatePath } from "next/cache";
import { onCreateStream } from "../Services/createStream.service";
import { connectToDatabase } from "../Database";


export const onCreatingStream = async () => {
    await connectToDatabase(); // Ensure database connection

    try {
        const streamData = await onCreateStream();
        console.log('streamData all', streamData)
        revalidatePath('/'); 

        if (!streamData) {
            throw new Error("cant create stream at all");
            
        }

        return streamData; // Return the followed user
    } catch (error) {
        console.error("Error occurred during follow:", error); 
        throw new Error("Internal error");
    }
};