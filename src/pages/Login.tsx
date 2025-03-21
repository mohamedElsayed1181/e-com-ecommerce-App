import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../component/Form";
import { signInSchema, signInType } from "../validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "../component/shared/Heading/Heading";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actAuthLogin, resetUi } from "../store/auth/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<signInType> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUi());
    };
  }, [dispatch]);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <Heading> Get started today!</Heading>
      <div className="mx-auto max-w-lg text-center">
        <p className="text-gray-600 text-center mb-8 flex items-center justify-center text-wrap">
          "Welcome back! Sign in to your account to explore exclusive deals"
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <Input
            label="email"
            name="email"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <Input
            label="password"
            name="password"
            register={register}
            errors={errors}
            type="password"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <a className="underline" href="/rigister">
              Sign up
            </a>
          </p>
          <button
            type="submit"
            disabled={loading === "pending"}
            className={`inline-block rounded-lg px-5 py-3 text-sm font-medium text-white ${
              loading === "pending"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
          >
            {loading === "pending" ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
