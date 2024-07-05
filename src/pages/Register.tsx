//Register.tsx
import { RootState } from "@/app/store";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setToken } from "@/features/auth/authSlice";
import { useRegisterMutation } from "@/services/auth";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AuthSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 4 characters")
    .required("Password is required"),
});
const Register = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  const [register, { isError, isSuccess, error, isLoading, data }] =
    useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      navigate("/dashboard");
    }
  }, [dispatch, isSuccess]);
  return (
    <section className="py-6">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isError && (
            <Alert variant="destructive" className="mb-3 items-center">
              <AlertTitle>
                {(error as any)?.data?.message ||
                  (error as any)?.error ||
                  "An error occurred"}
              </AlertTitle>
            </Alert>
          )}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={AuthSchema}
            onSubmit={(values, { resetForm }) => {
              register({
                name: values.name,
                email: values.email,
                password: values.password,
              });
              resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <span className="text-red-600 text-sm">{errors.name}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <span className="text-red-600 text-sm">{errors.email}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <span className="text-red-600 text-sm">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Creating an account..." : "Create am account"}
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="underline">
                    Login here
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </section>
  );
};
export default Register;
