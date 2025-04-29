// app/game/page.tsx
import React from "react";
import PlayUnityLink from "@/components/PlayUnityLink";
import styles from "./page.module.css";

export default function GamePage() {
  return (
    <div className={styles.container}>
      <h1>Your Game Hub</h1>
      <p>
        Click below to launch the Unity WebGL build in a new browser tab:
      </p>
      <PlayUnityLink />
    </div>
  );
}
