import { connectToDatabase } from "../Database";
import Subscribers from "../Database/models/Subscribers.model";
import StreamData from "../Database/models/streamData.models";
import { getLoginUser } from "./auth.service";

// Function to subscribe to a stream
export const subscribeToStream = async (streamId: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

        // Find the stream by its ID
        const stream = await StreamData.findById(streamId);

        if (!stream) {
            throw new Error("Stream not found");
        }

        // Check if the user is already subscribed to the stream
        const existingSubscription = await Subscribers.findOne({
            userId: loggedInUser._id,
            streamId: stream._id
        });

        if (existingSubscription) {
            return {
                success: false,
                message: "User is already subscribed to this stream"
            };
        }

        // Create a new subscription
        const subscription = await Subscribers.create({
            userId: loggedInUser._id,
            streamId: stream._id
        });

        return {
            success: true,
            subscription
        };
    } catch (error) {
        console.error("Error in subscribeToStream:", error); // Log the error
        return {
            success: false,
            message: "An error occurred while subscribing to the stream"
        };
    }
};
