import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: " ",
        email: " ",
        password: " ",
        confirmPassword: " ",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    function handleSubmit(e){
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if( !name || !email || !password || !confirmPassword ){
            toast.error("All field required");
            return;
        }
        if(password !== confirmPassword){
            toast.error("Password do not match");
            return;
        }

        navigate('/login');
    }

 return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-xl border">

        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription>
            Sign up to start tracking your habits
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full">
              Register
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default Register
