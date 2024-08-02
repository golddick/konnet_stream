'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { connectToDatabase } from "../Database"
import User from "../Database/models/user.model"
import StreamData, { IStreamProps } from "../Database/models/streamData.models"
import { getLoginUser } from "./auth.service"



export const onCreateStream = async () => {
    await connectToDatabase();

    try {
        const loggedInUser = await getLoginUser();
        if (!loggedInUser) {
            throw new Error("User not found");
        }
        console.log('Logged-in user:', loggedInUser);

        // Update user model to include the new stream reference
        const updatedUser = await User.findByIdAndUpdate(
            loggedInUser._id,
            { $addToSet: { streamData: { _id: loggedInUser._id, creatorName: `${loggedInUser.displayName}'s stream` } } },
            { new: true }
        );

        // Create the stream
        const stream = await StreamData.create({
            _id: `${loggedInUser._id}`,
            creatorName: `${loggedInUser.displayName}'s stream`
        });

        return stream;
    } catch (error) {
        console.error("Error creating stream:", error);
        throw error;
    }
};


export const getStreamByUserId = async (_id: string) => {
    await connectToDatabase();

    try {
        // Find all streams associated with the user ID
        const streams = await StreamData.findById({ _id: _id }).lean(); // Assuming userId is the field representing user ID in StreamData

        if (!streams ) {
            console.log("No streams found for user:", _id);
            // return null; // Return null or another appropriate value if no streams are found
        }

        return streams;
    } catch (error) {
        console.error("Error getting streams by user ID:", error);
        throw error;
    }
};



export const getAllStreamData = async () => {
    await connectToDatabase();
    try {
        // Find all stream data
        const allStreamData = await StreamData.find({});

        return allStreamData;
    } catch (error) {
        console.error("Error getting all stream data:", error);
        throw error;
    }
};


export const updateStream = async (values: Partial<IStreamProps>) => {
    await connectToDatabase()
    try {
        const loggedInUser = await getLoginUser();
        const userId = loggedInUser._id
        const myStream = await StreamData.findById(userId);

        console.log(myStream)

        if (!myStream) {
            throw new Error("Stream not found");
        }

        const validData ={
            streamName:values.streamName,
            address:values.address,
            desc:values.desc,
            price: values.price,
            isFree: values.isFree,
            isLive:false,
            participant: values.participant,
            organizers: values.organizers,
            accBank: values.accBank,
            accName: values.accName,
            accNumber: values.accNumber,
        }

        const updatedStream = await StreamData.findByIdAndUpdate(myStream._id, validData, { new: true });

        if (!updatedStream) {
            throw new Error("Failed to update stream");
        }





    const updateUserStream = await User.findOneAndUpdate(
        { _id: userId, 'streamData._id': userId },
        {
            $set: {
                'streamData.$.streamName': updatedStream.streamName,
                'streamData.$.address': updatedStream.address,
                'streamData.$.desc': updatedStream.desc,
                'streamData.$.price': updatedStream.price,
                'streamData.$.isFree': updatedStream.isFree,
                'streamData.$.isLive': updatedStream.isLive,
                'streamData.$.participant': updatedStream.participant,
                'streamData.$.organizers': updatedStream.organizers,
                'streamData.$.accBank': updatedStream.accBank,
                'streamData.$.accName': updatedStream.accName,
                'streamData.$.accNumber': updatedStream.accNumber,
            }
        },
        { new: true } // This ensures the returned document is the updated one
    );





        revalidatePath(`/Dashboard/${loggedInUser.displayName}/Panel`)
        revalidatePath(`/Dashboard/${loggedInUser.displayName}`)
        revalidatePath(`/${loggedInUser.displayName}`)
        return updatedStream;
    } catch (error) {
        console.log(error)
        throw new Error("internal error");

        
    }
}


export const updateOtherStreamInfo = async (values: Partial<IStreamProps>) => {
    await connectToDatabase()
    try {
        const loggedInUser = await getLoginUser();
        const userId = loggedInUser._id
        const myStream = await StreamData.findById(userId);

        console.log(myStream)

        if (!myStream) {
            throw new Error("Stream not found");
        }

        const validData ={
            thumbnailUrl:'',
            isChatEnabled:values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        }

        const updatedStream = await StreamData.findByIdAndUpdate(myStream._id, validData, { new: true });


        if (!updatedStream) {
            throw new Error("Failed to update stream");
        }





    const updateUserStream = await User.findOneAndUpdate(
        { _id: userId, 'streamData._id': userId },
        {
            $set: {
                'streamData.$.isChatEnabled': updatedStream.isChatEnabled,
                'streamData.$.isChatFollowersOnly': updatedStream.isChatFollowersOnly,
                'streamData.$.isChatDelayed': updatedStream.isChatDelayed,
  
            }
        },
        { new: true } // This ensures the returned document is the updated one
    );


        revalidatePath(`/u/${loggedInUser.username}/Chat`)
        revalidatePath(`/u/${loggedInUser.username}`)
        revalidatePath(`/${loggedInUser.username}`)
        return updatedStream;
    } catch (error) {
        throw new Error("internal error");

        
    }
}

