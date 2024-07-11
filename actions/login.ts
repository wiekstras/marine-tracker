"use server";

import * as z from 'zod';

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/data/mail";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields!"};
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.password || !existingUser.email){
        return { error: "Invalid credentials!"};
    }

    if (!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return { success: "Email verificatie verstuurd! Check je email om je account te activeren."};
    }


    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        console.log("login success")
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return { error: "Invalid credentials!"};
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};