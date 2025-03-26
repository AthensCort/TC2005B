// TSX (React + TypeScript) - SignUpForm.tsx
'use client'
import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
/*import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";*/
import { Eye, EyeOff } from "lucide-react";
import Background from "../background/page"; 
import "./page.css";

interface userData{
  nombre: string,
  contrasena: string, 
  correo: string,
  telefono:string,
  empresa:string
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState<userData>(
    {nombre:"", 
    contrasena: "", 
    correo:"", 
    telefono:"", 
    empresa:""
  });
  
  const auth = (e: React.FormEvent) =>{
    e.preventDefault();
    fetch("http://localhost:3000/users", 
    {
    method:"POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body:JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok){setError("The call couldn't be completed");}
      return response.json();
    })
    .then(data => console.log(data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
    <Background/>
    <div className="container">
      <div className="flex flex-col items-start p-30  leading-none ">
        <h2 className="select-none text-[14rem] font-dangrek italic text-white">
          LEAD
        </h2>
        <h2 className="select-none text-[14rem] font-dangrek italic text-blue-500">
          FLOW
        </h2>
      </div>
      <Card className="card">
        <CardContent>
          <h2 className="title">Register</h2>
          <div className="input-group space-y-4">
            <div>
                <label className="label">Name</label>
                <Input 
                name="nombre"
                type="text" 
                placeholder="Enter your name" 
                className="input" 
                onChange={handleChange}
                value ={formData.nombre}
                />
              </div>
              <div>
                <label className="label">Email</label>
                <Input 
                name="correo"
                type="email" 
                placeholder="Enter your email" 
                className="input" 
                onChange={handleChange}
                value = {formData.correo}/>
              </div>
              <div>
                <label className="label">Number</label>
                <Input 
                name="telefono"
                type="tel" 
                placeholder="Enter your phone number" 
                className="input" 
                onChange ={handleChange}
                value = {formData.telefono}/>
              </div>
              <div>
                <label className="label">Enterprise</label>
                <Input 
                name="empresa"
                type="text" 
                placeholder="Enter the affiliated enterprise" 
                className="input" 
                onChange={handleChange}
                value ={formData.empresa}/>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Input
                    name="contrasena"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input"
                    onChange ={handleChange}
                    value = {formData.contrasena}
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
              <Button onClick={auth} className="submit-button">Create account</Button>
              </Link>
            </div>
            <p className="login-link">
            Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </CardContent>
          {error && <p className="text-red-500"></p>}
        </Card>
      </div>
    </div>
  );
}