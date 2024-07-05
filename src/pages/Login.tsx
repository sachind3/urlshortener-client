//Login.tsx
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
import { useLoginMutation } from "@/services/auth";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as Yup from "yup";

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 4 characters")
    .required("Password is required"),
});
const Login = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (user) {
      //navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      navigate(from, { replace: true });
    }
  }, [navigate, user, from]);
  const [login, { isError, isSuccess, error, isLoading, data }] =
    useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [dispatch, isSuccess]);
  return (
    <section className="py-6">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
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
              email: "",
              password: "",
            }}
            validationSchema={AuthSchema}
            onSubmit={(values, { resetForm }) => {
              login({
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
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
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
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="underline">
                    Register here
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
export default Login;
