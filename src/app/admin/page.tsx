import Link from "next/link";
import { Container } from "~/ui/containers";

const tables = ["Users", "Forms"]; // Add your table names here

export default function Admin() {
  return (
    <Container className="flex flex-col-reverse items-stretch gap-10 py-10 2xl:flex-row">
      <div className="sticky top-5 h-96 rounded-lg bg-secondary p-5 2xl:w-4/12"></div>
      <div className="h-96 w-full overflow-hidden overflow-y-auto rounded-lg border-accent/30 bg-secondary 2xl:w-7/12 2xl:p-5"></div>
    </Container>
  );
}
