import { Container } from "~/ui/containers";

import { getServerAuthSession } from "~/server/auth";
import { RoleContaier } from "~/app/admin/roles/container";

export default async function RolesPage() {
  const session = await getServerAuthSession();
  return (
    <Container
      rtl
      className="flex flex-col-reverse items-stretch gap-10  py-10 2xl:flex-row "
    >
      <RoleContaier session={session} />
    </Container>
  );
}
