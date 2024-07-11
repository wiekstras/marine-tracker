"use server";
import * as z from 'zod';

import {ResetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/data/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields!"};
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error: "Email niet gevonden"};
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Email verstuurd! Check je email om je wachtwoord te resetten."};

}