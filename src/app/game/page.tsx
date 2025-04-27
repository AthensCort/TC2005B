"use client";
import { useEffect } from "react";

export default function GamePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/unityBuild/Build/UnityLoader.js"; // UnityLoader file
    script.onload = () => {
      window.createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "/unityBuild/Build/yourbuild.data",
        frameworkUrl: "/unityBuild/Build/yourbuild.framework.js",
        codeUrl: "/unityBuild/Build/yourbuild.wasm",
      }).catch((message) => {
        console.error(message);
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <canvas id="unity-canvas" style={{ width: "960px", height: "600px" }}></canvas>
    </div>
  );
}
