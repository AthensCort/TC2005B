// src/components/Header.tsx
"use client";

import { usePathname } from "next/navigation";
import PlayUnityLink from "@/Unity/PlayUnityLink";

export default function Header() {
  const path = usePathname();

  return (
    <header style={{ padding: "1rem", background: "#1f2937" }}>
      {/* only show the Unity link on /game */}
      {path === "/game" && <PlayUnityLink />}
    </header>
  );
}