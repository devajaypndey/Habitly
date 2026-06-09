/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPassword, useResetPassword } from "../api/auth/apiAuth";
import { toast } from "react-toastify";
import { ChevronLeft, Loader } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgetPasswordMutation = useForgetPassword();
  const resetPasswordMutation = useResetPassword();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await forgetPasswordMutation.mutateAsync(
        { email },
        {
          onSuccess: (data) => {
            setOtpSent(true);
            setStep("verify");
            toast.success(data.message || "OTP sent to your email");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please confirm password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync(
        { email, otp, newPassword, confirmPassword },
        {
          onSuccess: (data) => {
            toast.success(data.message || "Password reset successfully");
            navigate("/login");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass = `border border-border rounded-md px-3 py-2 w-full text-sm
                      focus:border-[var(--notion-blue)] focus:shadow-[0_0_0_1px_var(--notion-blue)] transition-all`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md notion-animate-in">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to login
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block text-5xl mb-3 select-none">🔐</div>
          <h1 className="notion-title text-3xl mb-1">Reset Password</h1>
          <p className="notion-caption text-sm">
            {step === "email"
              ? "Enter your email to receive an OTP"
              : "Verify OTP and set new password"}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {step === "email" ? (
            <>
              {/* Email Input */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>


              <button
                onClick={handleSendOtp}
                disabled={forgetPasswordMutation.isPending}
                className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--notion-blue)" }}
              >
                {forgetPasswordMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 inline animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </>
          ) : (
            <>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP..."
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength="6"
                  inputMode="numeric"
                  disabled={resetPasswordMutation.isPending}
                  className={inputClass}
                />
              </div>


              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={resetPasswordMutation.isPending}
                  className={inputClass}
                />
              </div>


              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={resetPasswordMutation.isPending}
                  className={inputClass}
                />
              </div>


              <button
                onClick={handleResetPassword}
                disabled={resetPasswordMutation.isPending}
                className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--notion-blue)" }}
              >
                {resetPasswordMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 inline animate-spin mr-2" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="w-full py-2 rounded-md text-sm font-medium border border-border hover:bg-accent transition-colors"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;