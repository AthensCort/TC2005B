// TC2005B-Modif-Caro/components/PlayUnityLink.tsx
"use client";

import React from "react";

export default function PlayUnityLink() {
  return (
    <a
      href="/unity/index.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "0.5rem 1rem",
        background: "#0070f3",
        color: "#fff",
        borderRadius: "0.3rem",
        textDecoration: "none",
      }}
    >
      ▶ Play Unity Game
    </a>
  );
}