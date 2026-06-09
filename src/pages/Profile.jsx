/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../api/auth/apiAuth";
import { ChevronLeft, Loader, Lock } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserProfile();
  const [avatarLetter, setAvatarLetter] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader className="w-8 h-8 animate-spin text-(--notion-blue)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500">Error loading profile</p>
      </div>
    );
  }

  const user = userData?.user || {};
  const getAvatarLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="notion-topbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="notion-icon-btn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">Profile</span>
        </div>
      </div>

      {/* Cover */}
      <div className="notion-cover">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #E8F4F8 0%, #D4E6D9 30%, #F0EAD6 70%, #E8E1CF 100%)",
          }}
        />
      </div>

      {/* Page Content */}
      <div className="notion-page pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Avatar Section */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: "var(--notion-blue)" }}
            >
              {getAvatarLetter(user.username)}
            </div>
          </div>

          {/* User Info Section */}
          <div className="notion-animate-in space-y-6">
            {/* Username */}
            <div className="border border-border rounded-md p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Username
              </label>
              <p className="text-base font-medium">{user.username || "N/A"}</p>
            </div>

            {/* Email */}
            <div className="border border-border rounded-md p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Email
              </label>
              <p className="text-base font-medium break-all">{user.email || "N/A"}</p>
            </div>

            {/* Verification Status */}
            <div className="border border-border rounded-md p-4">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Email Verification
              </label>
              <p className="text-sm">
                {user.isEmailVerified ? (
                  <span className="text-green-500 font-medium">✓ Verified</span>
                ) : (
                  <span className="text-yellow-500 font-medium">Pending</span>
                )}
              </p>
            </div>

            {/* Forget Password Button */}
            <button
              onClick={() => navigate("/forget-password")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90 mt-8"
              style={{ background: "var(--notion-blue)" }}
            >
              <Lock className="w-4 h-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;