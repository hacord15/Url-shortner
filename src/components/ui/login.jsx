import React from 'react'
import { BeatLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './input'
import { Button } from './button'
import Error from './error'
import * as Yup from 'yup'

const Login = () => {

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = React.useState({}); // ✅ added state for errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ prevent default missing before
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters long')
          .required('Password is required'),
      });
      await schema.validate(formData, { abortEarly: false });
      // ✅ validation passed — logic kept same
    } catch (err) {
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already have one</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <form onSubmit={handleLogin}>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <CardFooter className="pt-4">
            <Button type="submit">
              {true ? <BeatLoader size={10} color="#36d7b7" /> : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
