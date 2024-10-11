"use client";

import { Role } from "@prisma/client";
import React from "react";
import { api } from "~/trpc/react";

import Button from "~/ui/buttons";

export function RolesList({ session, onChange = (role: Role) => {} }) {
  if (!session) return <></>;
  const roles = api.role.getAll.useQuery();

  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-end gap-5">
        {!roles.isPending &&
          roles.data.map((r: Role, i) => {
            return (
              <Button
                key={i}
                onClick={() => {
                  onChange(r);
                }}
                className="min-w-[10rem] rounded-xl border border-dashed border-accent/50 bg-secondary p-5 text-center  text-primary"
              >
                {r.name}
              </Button>
            );
          })}
      </div>
    </>
  );
}

/*<Button
              key={i}
              onClick={() => {
                onChange(r);
              }}
              className="min-w-[10rem] rounded-xl border border-dashed border-accent/50 bg-secondary p-5 text-center  text-primary"
            >
              {r.name}
            </Button>*/
