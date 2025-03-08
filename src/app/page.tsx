import Image from "next/image";
import Login from "./login/page";
import Background from "./background/background";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Login/> 
    </div>
  );
}
