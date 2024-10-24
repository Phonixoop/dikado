import { redirect } from "next/navigation";
import React from "react";

import CreateAccountForm from "~/app/login/form";
import { MultiStepProvider } from "~/context/multiform.context";
import { getServerAuthSession } from "~/server/auth";
import { userLoginSchema } from "~/server/validations/user.validation";
import BlurBackground from "~/ui/blur-backgrounds";

const stepNames = [
  "phonenumber",
  "wait_sendcode",
  "entercode",
  "wait_validatecode",
  "error",
  "welcome",
];
const initialValues = {
  phonenumber: "",
  code: "",
};
export default async function LoginPage({}) {
  const session = await getServerAuthSession();
  if (session) redirect("/");

  return (
    <>
      <BlurBackground />

      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-secondary transition-colors duration-1000">
        <div className="absolute top-0 flex w-full items-start justify-center"></div>
        <div className="flex w-full items-center justify-center">
          <div className="flex w-11/12 md:w-3/5">
            {session?.user?.username}
            <MultiStepProvider
              validationSchema="userLogin"
              stepNames={stepNames}
              initialValues={initialValues}
            >
              <CreateAccountForm />
            </MultiStepProvider>
          </div>
        </div>
      </div>
    </>
  );
}

/* const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }*/
