import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUsername, login } from "@/services/apiBlog";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallText from "@/ui_components/SmallText";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (response) => {
      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);
      setIsAuthenticated(true);
      getUsername().then((response) => setUsername(response.username));
      toast.success("You have successfully logged in!");
      const from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
    dark:text-white dark:bg-[#141624]"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">Login Form</h3>
        <p>Welcome back! Log in to continue.</p>
      </div>

      <div>
        <Label htmlFor="username" className="dark:text-[#97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          disabled={mutation.isPending}
          placeholder="Enter Username"
          {...register("username", { required: "Username is requiered" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <InputError error={errors.username.message} />
        )}
      </div>

      <div>
        <Label htmlFor="password" className="dark:text-[#97989F]">
          Password
        </Label>
        <Input
          type="text"
          id="password"
          disabled={mutation.isPending}
          placeholder="Enter Password"
          {...register("password", { required: "Password is requiered" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.password?.message && (
          <InputError error={errors.password.message} />
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button
          disabled={mutation.isPending}
          className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              {" "}
              <SmallSpinner />
              <SmallText message={"Logging In..."} />
            </>
          ) : (
            <SmallText message={"Login"} />
          )}
        </button>
        <p className="text-[14px] mt-4">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
