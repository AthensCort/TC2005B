// TSX (React + TypeScript) - SignUpForm.tsx
'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import "./page.css";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
    <div className="container">
    <div className="flex flex-col items-center p-10">
  <h2 className="text-9xl font-dangrek  italic text-white">LEAD</h2>
  <h2 className="text-9xl font-dangrek italic text-blue-500">FLOW</h2>
  /*babygirl chikibby*/
</div>
      <Card className="card">
        <CardContent>
          <h2 className="title">Create an account</h2>
          <div className="social-buttons">
            <Button className="google-button">
              <FcGoogle className="icon" /> Google
            </Button>
            <Button className="facebook-button">
              <FaFacebook className="icon fb" /> Facebook
            </Button>
          </div>
          <p className="divider">Or</p>
          <div className="input-group">
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
              <div className="forgot-password">Forgot?</div>
            </div>
            <Button className="submit-button">Create account</Button>
          </div>
          <p className="login-link">
            Already have an account? <span>Log In</span>
          </p>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
