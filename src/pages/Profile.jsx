
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../api/auth/apiAuth";
import {
  ChevronLeft,
  Loader,
  Lock,
  Mail,
  User,
  BadgeCheck,
  ShieldAlert,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader className="w-8 h-8 animate-spin text-(--notion-blue)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
          <p className="text-red-500 font-medium">
            Error loading profile
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--notion-blue)" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const user = userData?.user || userData?.userData || {};

  const getAvatarLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

return (
  <div className="min-h-screen bg-background">
    <div className="max-w-2xl mx-auto px-5 pt-6 pb-24">
      
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      
      <div className="flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg"
          style={{ background: "var(--notion-blue)" }}
        >
          {getAvatarLetter(user.username)}
        </div>

        <h2 className="mt-4 text-2xl font-bold">
          {user.username || "Unknown User"}
        </h2>

        <p className="mt-1 text-muted-foreground">
          {user.email || "No Email"}
        </p>
      </div>

      
      <div className="mt-8 space-y-4">
        
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="mb-2 flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Username</span>
          </div>

          <p className="text-muted-foreground">
            {user.username || "N/A"}
          </p>
        </div>

        
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="mb-2 flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Email</span>
          </div>

          <p className="break-all text-muted-foreground">
            {user.email || "N/A"}
          </p>
        </div>

        
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center gap-3">
            {user.isEmailVerified ? (
              <BadgeCheck className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-yellow-500" />
            )}

            <span className="font-semibold">
              Email Verification
            </span>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              user.isEmailVerified
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {user.isEmailVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      
      <div className="mt-8">
        <button
          onClick={() => navigate("/forget-password")}
          className="w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-white font-medium shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
          style={{ background: "var(--notion-blue)" }}
        >
          <Lock className="h-5 w-5" />
          <span>Change Password</span>
        </button>
      </div>
    </div>
  </div>
);

};

export default Profile;

