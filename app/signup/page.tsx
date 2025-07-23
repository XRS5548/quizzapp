"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Submitform } from "./action";
import { LoaderOne } from "@/components/ui/loader";

export default function SignupFormDemo() {
  let [buttonContent, setButtonContent] = useState(<>
    Sign up &rarr;
    <BottomGradient />
  </>)
  let [buttonDisabled, setButtonDisabled] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setButtonDisabled(true);
  setButtonContent(<LoaderOne />);

  const form = e.currentTarget;
  if (form.checkValidity()) {
    form.submit(); // safest way to trigger native form submission
  } else {
    setButtonDisabled(false);
    setButtonContent(<>Submit</>);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Hi Quizz
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to Hi Quizz if you can because we don&apos;t have a login flow
          yet
        </p>

        <form onSubmit={handleSubmit} className="my-8" action={Submitform} >
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label className={""} htmlFor="firstname">First name</Label>
              <Input required className={""} id="firstname" placeholder="Tyler" name="fname" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label className={""} htmlFor="lastname">Last name</Label>
              <Input required className={""} id="lastname" placeholder="Durden" name="lname" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label className={""} htmlFor="email">Email Address</Label>
            <Input className={""} required id="email" placeholder="projectmayhem@fc.com" name="email" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label className={""} htmlFor="password">Password</Label>
            <Input className={""} required id="password" placeholder="••••••••" name="password" type="password" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label className={""} htmlFor="confirmpassword">Confirm password</Label>
            <Input className={""}
              required
              name="cpassword"
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            disabled={buttonDisabled}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            {buttonContent}
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an Account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
