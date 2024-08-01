import { auth } from "@/app/auth";
import { connectToDatabase } from "../Database";
import User from "../Database/models/user.model";
import { handleError } from "@/lib/utils";

export const getLoginUser = async () => {

    const session = await auth()
    const userInfo = session?.user
    console.log(userInfo?._id)
  
  

        await connectToDatabase();
    
        try {

    
            // console.log('logged user', loggedUser);
    
            const displayName = userInfo?.displayName
            const userID = userInfo?._id

            console.log(!!userID)
    
    
            if (!userID || !displayName) {
                // throw new Error("Unauthorized id or display name not found");
                return null;
            }
    
            const userLoggedIn = await User.findOne({ _id: userID });
    
            if (!userLoggedIn) {
                throw new Error("User not found in the database  ");
            }
    
            return JSON.parse(JSON.stringify(userLoggedIn));
        } catch (error) {
            // Handle the error or re-throw it for global error handling
            handleError(error);
            throw error;
        }
    };
