"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onBackToLogin: () => void;
}

interface OTPFormData {
  otp: string;
}

const OTPVerification = ({
  email,
  onSuccess,
  onBackToLogin,
}: OTPVerificationProps) => {
  const { register, handleSubmit } = useForm<OTPFormData>();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes

  // Timer effect
  useEffect(() => {
    if (timer <= 0) {
      toast.error("OTP Expired", {
        description: "Your OTP has expired. Please login again.",
      });
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOTPSubmit: SubmitHandler<OTPFormData> = async (data) => {
    try {
      setLoading(true);
      console.log("🔄 Verifying OTP...");

      const res = await axios.post("/api/admin-login", {
        email,
        otp: data.otp,
        step: 2,
      });

      if (res.data.success) {
        toast.success("OTP Verified!", {
          description: "Welcome to admin panel",
        });
        onSuccess();
      } else {
        toast.error("Invalid OTP", {
          description: res.data.error || "Please try again",
        });
      }
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      toast.error("Verification failed", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Backup code submission functionality has been removed

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit(handleOTPSubmit)}
        className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            🔐 Verify Your Identity
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            We sent a verification code to your email
          </p>
          <p className="text-xs text-zinc-400 mt-2 font-semibold">
            {email}
          </p>
        </div>

        {/* Timer Display */}
        <div
          className={`text-center py-3 px-4 rounded-lg border-2 ${
            timer < 60
              ? "border-red-400 bg-red-50 dark:bg-red-900/20"
              : "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
          }`}
        >
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Code expires in: <span className="text-lg font-bold text-red-600">{formatTime(timer)}</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm text-zinc-700 dark:text-zinc-300">
            Enter OTP Code
          </Label>
          <Input
            type="text"
            id="otp"
            placeholder="000000"
            maxLength={6}
            required
            {...register("otp", {
              required: "OTP is required",
              minLength: { value: 6, message: "OTP must be 6 digits" },
            })}
            className="text-center text-2xl tracking-widest font-bold border-zinc-300 dark:border-zinc-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
          />
          <p className="text-xs text-zinc-500">
            Check your email for the 6-digit code
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        {/* Back to Login */}
        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors"
        >
          Back to Login
        </button>
      </form>
    </section>
  );
};

export default OTPVerification;
