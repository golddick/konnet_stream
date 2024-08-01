import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/authConfig";
// import bcrypt from 'bcrypt'
import User from "@/lib/Api/Database/models/user.model";
import { connectToDatabase } from "@/lib/Api/Database";
// import { connectToDatabase } from "./lib/database";
// import User from "./lib/database/models/user.model";

const login = async (credentials) => {
  try {
    // connectToDB();
    await connectToDatabase( )
    
    const user = await User.findOne({ email: credentials.email }).lean();

    console.log(credentials.email)
    console.log(credentials.password)
    console.log(user)
    if (!user ) throw new Error("Wrong credentials!");

    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );

    // if (!isPasswordCorrect) throw new Error("Wrong password !");

    return user; 
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log(user)
          return user;
        } catch (err) {
          throw new Error("Failed to authorize");

        }
      },
 

    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.displayName = user.displayName;
        token.imageUrl = user.imageUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.displayName = token.displayName;
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
},

});