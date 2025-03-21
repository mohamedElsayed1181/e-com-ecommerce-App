import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "../validations/signUpSchema";
import { Input } from "../component/Form";
import Heading from "../component/shared/Heading/Heading";
import useCheckEmailAvabilty from "../hooks/useCheckEmailAvabilty";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actAuthRegister, resetUi } from "../store/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signUpType> = (data) => {
    const { firistName, secondName, email, password } = data;
    dispatch(actAuthRegister({ firistName, secondName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvabilty();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;

    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
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
      <div className="mx-auto max-w-lg text-center">
        <Heading> Get started today!</Heading>
        <p className="mt-4 text-gray-500">
          Sign up to access exclusive features and updates.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <Input
            label="firistName"
            name="firistName"
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <Input
            label="secondName"
            name="secondName"
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <Input
            label="email"
            name="email"
            register={register}
            errors={errors}
            onBlur={emailOnBlurHandler}
            formText={
              emailAvailabilityStatus === "checking"
                ? "We are checking email availability..."
                : emailAvailabilityStatus === "available"
                ? "This email is available!"
                : emailAvailabilityStatus === "notAvailable"
                ? "This email is already in use."
                : emailAvailabilityStatus === "failed"
                ? "Error from the server."
                : ""
            }
          />
        </div>
        <div>
          <Input
            type="password"
            label="password"
            name="password"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <Input
            type="password"
            label="confirmPassword"
            name="confirmPassword"
            register={register}
            errors={errors}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Already have an account?
            <a className="underline" href="/login">
              {" "}
              Sign in
            </a>
          </p>

          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={
              loading === "pending" || emailAvailabilityStatus === "checking"
            }
          >
            {loading === "pending" ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
