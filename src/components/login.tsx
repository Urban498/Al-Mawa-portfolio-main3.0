"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface loginData {
  email: string;
  password: string;
}

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const { register, handleSubmit } = useForm<loginData>();

  const handleLogin = async (data: loginData) => {
    try {
      console.log("🔄 Attempting login...");
      const res = await axios.post("/api/admin-login", data);
      console.log("📤 Login response:", res.data);
      
      if (res.data.success) {
        console.log("✅ Login successful, showing toast");
        toast.success("Login Success", {
          description: "Welcome to admin panel"
        });
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.href = "/admin";
        }
      } else {
        console.log("❌ Login failed:", res.data.error);
        toast.error(res.data.error || "Invalid credentials", {
          description: "Please check your credentials"
        });
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error("Something went wrong!", {
        description: "Please try again later"
      });
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Admin Sign In
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-zinc-700 dark:text-zinc-300">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            required
            placeholder="admin@example.com"
            {...register("email")}
            className="w-full border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-zinc-700 dark:text-zinc-300">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            required
            placeholder="********"
            {...register("password")}
            className="w-full border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default LoginPage;
