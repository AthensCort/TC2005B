// TSX (React + TypeScript) - SignUpForm.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Background from "../background/page"; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className= "relative h-screen w-full">
      <Background />

      <div className= {styles.container}>
        <div className="flex flex-col items-start p-30 leading-none">
          <h2 className="text-[14rem] font-dangrek italic text-white">
            LEAD
          </h2>
          <h2 className="text-[14rem] font-dangrek italic text-blue-500">
            FLOW
          </h2>
        </div>

        <Card className={styles.card}>
          <CardContent>
            <h2 className={`${styles.title} text-[2rem]`}>Welcome back!</h2>
            <div className={styles["social-buttons"]}>
              <Button className={styles["google-button"]}>
                <FcGoogle className={styles.icon} /> Google
              </Button>
              <Button className={styles["facebook-button"]}>
                <FaFacebook className={`${styles.icon} ${styles.fb}`} /> Facebook
              </Button>
            </div>
            <p className={styles.divider}>Or</p>
            <div className="input-group space-y-4">
              <div>
                <label className={styles.label}>Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
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
              <Link href="/dashboard">
                <Button className={styles["submit-button"]}>Create account</Button>
              </Link>
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