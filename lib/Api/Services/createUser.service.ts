'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { connectToDatabase } from "../Database"
import User from "../Database/models/user.model"

export const createUser = async (values: any) => {
    const { email, displayName, password,imageUrl } = values;

    try {
        // Connect to the database
        await connectToDatabase();

        // Create a new User instance
        const newUser = new User({
            email,
            displayName,
            password,
            imageUrl,
        });

        // Save the new user to the database
        await newUser.save();

        // If user creation is successful, redirect to login page
        
        // Optionally revalidate paths or perform other actions
        revalidatePath('/(auth)/Signup');
        // redirect('/Login');

        // Return something if needed
        return newUser; // Or any other relevant data
    } catch (error) {
        // Log the actual error for debugging
        console.error('Error creating user:', error);

        // Throw a more specific error message or handle differently
        throw new Error('Failed to create user');
    } finally {
        // Ensure to close the database connection after use
        // You should have a function in connectToDatabase to close the connection
        // For example:
        // await disconnectFromDatabase();
    }
};
