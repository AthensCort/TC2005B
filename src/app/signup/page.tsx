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
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserData {
  nombre: string;
  contrasena: string;
  email: string;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<UserData>({
    nombre: "",
    contrasena: "",
    email: "",
  });
  const router = useRouter();

  const auth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      router.push("/dashboard");


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

    <div className="h-screen w-full">
      <Background />

      <div className={`${styles.container} flex justify-center items-center`}>
        <div className="relative w-[90%] max-w-[1000px] -mr-10 ">
          <Image
            src="/leadflowW.png"
            alt="Lead Flow Logo"
            layout="responsive"
            width={1000}  // Base width for larger screens
            height={700}  // Base height for larger screens
            className="w-full h-auto"
          />
        </div>
        <Card className={`${styles.card} mr-20`}>

          <CardContent>
            <h2 className={styles.title}>Register</h2>
            <div className="space-y-4">
              {['nombre', 'email'].map((field) => (
                <div key={field}>
                  <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <Input
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
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
    </div>
  );
}
