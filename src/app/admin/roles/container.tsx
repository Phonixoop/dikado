"use client";
import React, { useState } from "react";

import { Role } from "@prisma/client";

import { RoleForm } from "~/app/admin/roles/form";
import { RolesList } from "~/app/admin/roles/list";
import { Session } from "next-auth";

export function RoleContaier({ session }: { session: Session }) {
  "use client";

  const [role, setRole] = useState<Role>();
  return (
    <>
      <div className="sticky top-5 h-fit rounded-lg border border-accent/30 bg-secondary p-5 2xl:w-6/12">
        <RoleForm
          selectedRole={role}
          onClear={() => {
            setRole(undefined);
          }}
        />
      </div>

      <RolesList
        session={session}
        onChange={(role) => {
          setRole(role);
        }}
      />
    </>
  );
}
