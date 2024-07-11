import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'

import {getUserById} from "@/data/user";
import { db } from '@/lib/db'
import authConfig from "@/auth.config";
import {UserRole} from "@prisma/client";

declare module "@auth/core" {
    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"];
    }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            return existingUser?.emailVerified;


        },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                },
            };
        },
        async jwt({token}) {
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser){
             return token;
            }
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})