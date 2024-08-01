'use server'

import { signIn } from "@/app/auth";
// import { connectToDatabase } from "../Database";


export const authenticate = async (credentials) => {
  const { email, password } = credentials

  console.log(email)
  console.log(password)

  try {
    // await connectToDatabase ()
    const user = await signIn('credentials',{ redirect: false , email, password});
    return user;
  } catch (error) {
    console.error('Error in authentication:', error);
    return { error: 'Wrong credentials' };
  }
};
