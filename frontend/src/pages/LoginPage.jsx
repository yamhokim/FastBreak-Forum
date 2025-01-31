import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
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
          placeholder="Enter Username"
          {...register("username", { required: "Username is requiered" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <small className="text-red-700 ">{errors.username.message}</small>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="dark:text-[#97989F]">
          Password
        </Label>
        <Input
          type="text"
          id="password"
          placeholder="Enter Password"
          {...register("password", { required: "Password is requiered" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.password?.message && (
          <small className="text-red-700">{errors.password.message}</small>
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          Login
        </button>
        <p className="text-[14px] mt-4">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
