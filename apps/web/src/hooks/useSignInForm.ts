import { AuthService } from "@crypto-payroll/api-client";
import { error } from "console";
import React, { useState } from "react";

export function useSignInForm() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!form.email.includes("@")) {
            newErrors.email = "Please enter an valid email"
        }
        if (form.password.length < 5) {
            newErrors.password = "Password must be at lead 5 characters"
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const response = await AuthService.postApiV1AuthSignin({
                requestBody: form
            });
            localStorage.setItem("accessToken",response.accessToken!);
            localStorage.setItem("tokenType",response.tokenType!);
            console.log("Signup Success: ", response);
        } catch (error) {
            console.error("Signup Failed: ", error);
        }
    };

    return { form, errors, handleChange, handleSubmit };
}