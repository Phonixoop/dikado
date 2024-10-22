import Link from "next/link";
import Button from "~/ui/buttons";

export default function LinkButton({
  children,
  href = "",
  className = "",
  ...rest
}) {
  return (
    <>
      <Link href={href} className="w-auto" passHref>
        <Button className={className} {...rest}>
          {children}
        </Button>
      </Link>
    </>
  );
}
