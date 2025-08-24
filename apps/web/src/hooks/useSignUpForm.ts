import { useState } from "react";
import { AuthService } from "@crypto-payroll/api-client";
import { SelectChangeEvent } from "@mui/material";

export function useSignUpForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setForm({ ...form, role: e.target.value as string });
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!form.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (form.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //stop page from reloading 
    if (!validate()) return;

    try {
      const response = await AuthService.postApiV1AuthSignup({
        requestBody: form,
      });
      console.log("Signup success:", response);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return { form, errors, handleChange, handleRoleChange, handleSubmit };
}