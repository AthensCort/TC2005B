// TSX (React + TypeScript) - SignUpForm.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Background from "../background/page"; // Importación del nuevo fondo
import "./page.css";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
    <Background/>
    <div className="container">
    <div className="flex flex-col items-start p-30  leading-none ">
    <h2 className="text-[14rem] font-dangrek italic text-white">LEAD</h2>
    <h2 className="text-[14rem] font-dangrek italic text-blue-500">FLOW</h2>
</div>
      <Card className="card">
        <CardContent>
          <h2 className="title">Register</h2>
          <div className="social-buttons">
            <Button className="google-button">
              <FcGoogle className="icon" /> Google
            </Button>
            <Button className="facebook-button">
              <FaFacebook className="icon fb" /> Facebook
            </Button>
          </div>
          <p className="divider">Or</p>
          <div className="input-group space-y-4">
          <div>
              <label className="label">User</label>
              <Input type="email" placeholder="Enter your email" className="input" />
            </div>
            <div>
              <label className="label">Email</label>
              <Input type="email" placeholder="Enter your email" className="input" />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <Link href="/profile">
            <Button className="submit-button">Create account</Button>
            </Link>
          </div>
          <p className="login-link">
          Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
