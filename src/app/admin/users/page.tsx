import React, { Suspense } from "react";

import { Container } from "~/ui/containers";

import { UserProvider, useUser } from "~/context/user.context";
import { UserForm } from "~/app/admin/users/form";

import { getServerAuthSession } from "~/server/auth";

import UsersList from "~/app/admin/users/list";

export default async function UsersPage() {
  const session = await getServerAuthSession();

  return (
    <Container className="flex flex-col-reverse items-stretch gap-10 py-10  2xl:flex-row ">
      <UserProvider>
        <div className="sticky top-5 h-fit rounded-lg bg-secondary p-5 2xl:w-4/12">
          <UserForm />
        </div>

        <div className=" h-fit max-h-[42rem] w-full overflow-hidden overflow-y-auto rounded-lg  border border-accent/30 bg-secondary  2xl:w-7/12 2xl:p-5">
          <UsersList session={session} />
        </div>
      </UserProvider>
    </Container>
  );
}
