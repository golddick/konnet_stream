import mongoose from 'mongoose';
import { connectToDatabase } from '../Database';
import StreamData, { IStreamProps } from '../Database/models/streamData.models';
import User from '../Database/models/user.model';
import { revalidatePath } from 'next/cache';
import { getLoginUser } from './auth.service';




// export const updateStreamAndPushToUser = async (_Id: string, values: any) => {
//     const {
//         email,
//         StreamName,
//         StreamDesc,
//         address,
//         endTime,
//         date,
//         price,
//         isFree,
//         participant,
//         organizers,
//         eventImg,
//         thumbVideo,
//         bankName,
//         accountName,
//         accountNumber
//     } = values;

//     try {
//         // Connect to the database
//         await connectToDatabase();

//         // Update the StreamData document
//         const updatedStream = await StreamData.findByIdAndUpdate(
//             _Id,
//             {
//                 email,
//                 StreamName,
//                 StreamDesc,
//                 address,
//                 endTime,
//                 date,
//                 price,
//                 isFree,
//                 participant,
//                 organizers,
//                 eventImg,
//                 thumbVideo,
//                 bankName,
//                 accountName,
//                 accountNumber
//             },
//             { new: true } // Return the updated document
//         );

//         if (!updatedStream) {
//             throw new Error('Stream not found');
//         }

//         // Find the User and push the updated StreamData reference
//         await User.findByIdAndUpdate(
//             _Id,
//             { $addToSet: { streamData: updatedStream._id } }, // Use $addToSet to avoid duplicates
//             { new: true } // Return the updated user document
//         );

//         // Optionally revalidate paths or perform other actions
//         revalidatePath('/'); // If using some sort of cache invalidation

//         // Return the updated stream or any other relevant data
//         return updatedStream;
//     } catch (error) {
//         // Log the actual error for debugging
//         console.error('Error updating stream and pushing to user:', error);

//         // Throw a more specific error message or handle differently
//         throw new Error('Failed to update stream and push to user');
//     } finally {
//         // Ensure to close the database connection after use
//         // await disconnectFromDatabase();
//     }
// };

// export const updateStream = async (values: Partial<IStreamProps>) => {
//     await connectToDatabase()
//     try {
//         const loggedInUser = await getLoginUser();
//         const userId = loggedInUser._id
//         const myStream = await StreamData.findById(userId);

//         console.log(myStream)

//         if (!myStream) {
//             throw new Error("Stream not found");
//         }

//         const validData ={
//             StreamName:values.streamName,
//             address:values.address,
//             StreamDesc:values.desc,
//             price: values.price,
//             isFree: values.isFree,
//             participant: values.participant,
//             organizers: values.organizers,
//             bankName: values.accBank,
//             accountName: values.accName,
//             accNumber: values.accNumber,
//         }

//         const updatedStream = await StreamData.findByIdAndUpdate(myStream._id, validData, { new: true });

//         revalidatePath(`/u/${loggedInUser.username}/Chat`)
//         revalidatePath(`/u/${loggedInUser.username}`)
//         revalidatePath(`/${loggedInUser.username}`)
//         return updatedStream;
//     } catch (error) {
//         throw new Error("internal error");

        
//     }
// }