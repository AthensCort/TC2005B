'use client';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
/*import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";*/
import { Eye, EyeOff } from "lucide-react";
import Background from "../background/page"; 
import styles from "./page.module.css";

interface UserData {
  nombre: string;
  contrasena: string;
  correo: string;
  telefono: string;
  empresa: string;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<UserData>({
    nombre: "",
    contrasena: "",
    correo: "",
    telefono: "",
    empresa: ""
  });

  const auth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ... your fetch code ...
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <Background />
      <div className="flex flex-col items-start p-30 leading-none">
        <h2 className="select-none text-[14rem] font-dangrek italic text-white">LEAD</h2>
        <h2 className="select-none text-[14rem] font-dangrek italic text-blue-500">FLOW</h2>
      </div>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Register</h2>
          <div className="space-y-4">
            {['nombre', 'correo', 'telefono', 'empresa'].map((field) => (
              <div key={field}>
                <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <Input 
                  name={field} 
                  type={field === 'correo' ? 'email' : 'text'} 
                  placeholder={`Enter your ${field}`} 
                  className={styles.input} 
                  onChange={handleChange} 
                  value={formData[field as keyof UserData]}
                />
              </div>
            ))}
            <div>
              <label className={styles.label}>Password</label>
              <div className="relative">
                <Input
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles.input}
                  onChange={handleChange}
                  value={formData.contrasena}
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
            <Button onClick={auth} className={styles["submit-button"]}>Create account</Button>
            <p className={styles["login-link"]}>
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
