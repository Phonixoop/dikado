"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments().filter(
    (segment) => !segment.startsWith("("),
  );

  return (
    <nav aria-label="breadcrumbs">
      <ol>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = segment.replace(/\[.+\]/, "").replace(/_/g, " ");

          return (
            <li key={segment}>
              {index > 0 && <span>/</span>}
              {index === segments.length - 1 ? (
                <span>{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
