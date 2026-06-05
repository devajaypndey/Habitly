import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    navigate("/login");
  }

  const inputClass = `notion-inline-input border border-border rounded-md px-3 py-2 w-full text-sm
                      focus:border-[var(--notion-blue)] focus:shadow-[0_0_0_1px_var(--notion-blue)] transition-all`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm notion-animate-in">


        <div className="text-center mb-8">
          <div className="inline-block text-5xl mb-3 select-none">🌿</div>
          <h1 className="notion-title text-3xl mb-1">Create account</h1>
          <p className="notion-caption text-sm">
            Sign up to start tracking your habits
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              name="name"
              placeholder="Enter your name..."
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a password..."
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password..."
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90 mt-2"
            style={{ background: "var(--notion-blue)" }}
          >
            Create account
          </button>
        </form>

        <div className="notion-divider my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground hover:underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
