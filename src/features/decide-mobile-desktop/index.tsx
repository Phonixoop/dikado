"use client";

import useStatus from "~/hooks/useStatus";

export default function DecideMobileOrDesktop() {
  const { isOnline, isDesktop } = useStatus();
  return <>{isDesktop ? "💻" : "📱"}</>;
}
