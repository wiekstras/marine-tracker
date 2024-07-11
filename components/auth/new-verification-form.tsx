"use client"

import { BeatLoader} from "react-spinners";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if(!token){
            setError("Geen token gevonden");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch((error) => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
      <CardWrapper
          headerLabel="Verivieer je mailadres"
          backButtonLabel="terug naar login"
          backButtonHref="/auth/login"
      >
          <div className="flex items-center w-full justify-center">
              {!success && !error &&(
                    <BeatLoader/>
              )}
              <FormSuccess message={success}/>
              {!success && (
                  <FormError message={error}/>
              )}
          </div>
      </CardWrapper>
    );
}