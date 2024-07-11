import * as z from "zod";

export const SearchSchmea = z.object({
    search: z.string().min(1, {
        message: "Zoek tenminste 1 letter",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Uw wachtwoord moet minimaal 6 letters bevatten",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "U moet een geldig E-mailadres invullen.",
    }),
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: "U moet een geldig E-mailadres invullen.",
    }),
    password: z.string().min(1, {
        message: "U moet een wachtwoord invullen.",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "U moet een geldig E-mailadres invullen.",
    }),
    password: z.string().min(6, {
        message: "Uw wachtwoord moet minimaal 6 letters bevatten",
    }),
    name: z.string().min(2, {
        message: "Uw naam heeft minimaal 2 letters nodig",
    })
});

export const ContactSchema = z.object({
    first_name: z.string().min(2, {
        message: "Uw naam heeft minimaal 2 letters nodig",
    }).max(18, {
        message: "Uw naam kan niet langer zijn dan 18 letters.",
    }),

    last_name: z.string().min(2, {
        message: "Uw naam heeft minimaal 2 letters nodig",
    }).max(18, {
        message: "Uw naam kan niet langer zijn dan 18 letters.",
    }),

    phone_number: z.string().min(10, {
        message: "Voer een geldig telefoonnummer in.",
    }).max(18, {
        message: "Voer een geldig telefoonnummer in.",
    }),

    email_address: z.string().email({
        message: "U moet een geldig E-mailadres invullen.",
    }),

    message: z.string().min(2, {
        message: "Uw bericht heeft minimaal 4 letters nodig.",
    }),
})