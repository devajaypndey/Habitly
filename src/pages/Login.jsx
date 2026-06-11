import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../api/auth/apiAuth";
import { Loader } from "lucide-react";


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      toast.error("Email and password required")
      return;
    }

    loginMutation.mutate(
      { email: formData.email, password: formData.password},
      {
        onSuccess: (data) => {
          dispatch(login(data.user));
          toast.success(data.message);
          navigate("/dashboard")
        },
        onError: (error) => {
          toast.error(error.message || "Login failed")
        }
      }
    )

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm notion-animate-in">


        <div className="text-center mb-8">
          <div className="inline-block text-5xl mb-3 select-none">🌿</div>
          <h1 className="notion-title text-3xl mb-1">Welcome back</h1>
          <p className="notion-caption text-sm">
            Sign in to continue to Habitly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
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
              className="notion-inline-input border border-border rounded-md px-3 py-2 w-full text-sm
                        focus:border-(--notion-blue) focus:shadow-[0_0_0_1px_var(--notion-blue)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleChange}
              required
              className="notion-inline-input border border-border rounded-md px-3 py-2 w-full text-sm
                        focus:border-(--notion-blue) focus:shadow-[0_0_0_1px_var(--notion-blue)] transition-all"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--notion-blue)" }}
          >
                {loginMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 inline animate-spin mr-2" />
                    logging...
                  </>
                ) : (
                  "Login in"
                )}
          </button>
        </form>


        <div className="notion-divider my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
