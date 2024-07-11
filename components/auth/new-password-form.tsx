"use client"

import * as z from "zod"
import {useForm} from "react-hook-form"
import {CardWrapper} from "@/components/auth/card-wrapper";
import {useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod"

import {Input} from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Button} from "@/components/ui/button";


import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {motion} from "framer-motion";
import {fadeIn} from "@/variants";

import {reset} from "@/actions/reset";
import {NewPasswordSchema} from "@/schemas";

export const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        startTransition(()=>{
            reset(values)
                .then((data)=> {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Wachtwoord vergeten?"
            backButtonLabel="Terug naar inloggen?"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <motion.div
                        variants={fadeIn()}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Wachtwoord</FormLabel>
                                    <FormControl>
                                          <Input
                                            disabled={isPending}
                                            placeholder="*******"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="default"
                        className="w-full"
                    >
                        Verander wachtwoord
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}