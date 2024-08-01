import { connectToDatabase } from "../Database";
import User from "../Database/models/user.model";
import { getLoginUser } from "./auth.service";

export const getRecommended = async () => {
    // Ensure database connection
    await connectToDatabase();

    try {

    // Get the currently logged-in user
    const loggedInUser = await getLoginUser();

    if (!loggedInUser) {
        const users = await User.find().sort({ createdAt: -1 }).lean();
        return users
    }

     // Get the IDs of all users followed by the logged-in user
     const followedUserIds = loggedInUser.following;
     console.log('followed user id', followedUserIds);

     // Get the IDs of all blocked users by the logged-in user
     const blockedUserIds = loggedInUser.blockedBy;
     console.log('blockedUserIds user id', blockedUserIds);

     // Combine followedUserIds and blockedUserIds into one array to exclude them from recommended users
     const excludedUserIds = [...followedUserIds,  ];

     // Fetch the list of recommended users excluding the logged-in user, followed users, and blocked users
     const recommendedUsers = await User.find({
         _id: { $ne: loggedInUser._id, $nin: excludedUserIds }
     }).sort({ createdAt: -1 }).lean();


     return recommendedUsers;

    // const users = await User.find().sort({ createdAt: -1 }).lean();
    // return users
       
    } catch (error) {
        console.error('Error fetching recommended users:', error);
        throw new Error('Error fetching recommended users');
    }
};
