"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail, AlertCircle, CheckCircle2, ArrowRight, Loader2, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setVerified(true);
        setSuccess(data.message || "Email verified successfully!");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 2000);
      } else {
        setError(data.error || "Verification failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "New OTP sent to your email!");
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue) {
      const newOtp = otp.split("");
      newOtp[index] = numericValue;
      const updatedOtp = newOtp.join("").slice(0, 6);
      setOtp(updatedOtp);
      
      // Auto-focus next input
      if (index < 5 && numericValue) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    } else if (value === "") {
      // Handle backspace - clear current and move to previous
      const newOtp = otp.split("");
      newOtp[index] = "";
      setOtp(newOtp.join(""));
      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl border border-border">
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 mb-4">
          <Mail className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Verify Your Email</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter the 6-digit code sent to <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-6">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {error && !verified && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {!verified ? (
        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
              Verification Code
            </label>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      const prevInput = document.getElementById(`otp-${index - 1}`);
                      if (prevInput) {
                        (prevInput as HTMLInputElement).focus();
                        handleOtpChange(index - 1, "");
                      }
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                    if (pastedData) {
                      setOtp(pastedData);
                      const nextEmptyIndex = Math.min(pastedData.length, 5);
                      const nextInput = document.getElementById(`otp-${nextEmptyIndex}`);
                      if (nextInput) {
                        (nextInput as HTMLInputElement).focus();
                      }
                    }
                  }}
                  id={`otp-${index}`}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  autoComplete="off"
                  suppressHydrationWarning
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading || otp.length !== 6}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Verify Email
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center py-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">Email Verified!</p>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      )}

      {!verified && (
        <>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-3">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResendOTP}
              disabled={resending}
            >
              {resending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Resend OTP
                </span>
              )}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Want to change email?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Go back
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

