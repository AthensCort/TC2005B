// TSX (React + TypeScript) - SignUpForm.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Background from "../background/page";
import { Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";
import Image from "next/image";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [contrasena, setPassword] = useState<string>("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena })
      });

      if (!res.ok) throw new Error("No se cuenta con los datos especificados")

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");

    } catch (error) {
      if (error instanceof Error)
        alert(error.message);
      else
        alert("Hubo un error en el inicio de sesión");

    }
  }

  return (
    <div className="h-screen w-full">
      <Background />
      <div className={`${styles.container} flex justify-center items-center`}>
        <div className="relative w-[90%] max-w-[1000px] -mr-40  ml-10">
          <Image
            src="/leadflowW.png"
            alt="Lead Flow Logo"
            layout="responsive"
            width={1000}  // Base width for larger screens
            height={700}  // Base height for larger screens
            className="w-full h-auto"
          />
        </div>
        <Card className={`${styles.card} w-full max-w-[400px] min-w-[280px] mx-auto p-6 md:p-10`}>
          <CardContent>
            <h2 className={`${styles.title} text-[2rem]`}>Welcome back!</h2>
            <div className="input-group space-y-4">
              <div>
                <label className={styles.label}>Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={contrasena}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={styles.input}
                  />
                  <button
                    type="button"
                    className={styles["toggle-password"]}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button
                className={styles["submit-button"]}
                onClick={handleLogin}>
                Enter
              </Button>
            </div>
            <p className={styles["login-link"]}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}