import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/apiBlog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SmallSpinner from "@/ui_components/SmallSpinner";
import InputError from "@/ui_components/InputError";
import SmallText from "@/ui_components/SmallText";
import { Textarea } from "@/components/ui/textarea";

const SignUpPage = ({ userInfo, updateForm = false }) => {
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: userInfo ? userInfo : {},
  });
  const { errors } = formState;

  const password = watch("password");

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account 👍");
      reset();
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
      className={`${
        updateForm && "h-[90%] overflow-y-auto overflow-x-hidden"
      } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">
          {updateForm ? "Update Profile Form" : "SignUp Form"}
        </h3>
        <p>
          {updateForm
            ? "You can tell us more about you!"
            : "Create your account to get started!"}
        </p>
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Enter Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <InputError error={errors.username.message} />
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.email?.message && <InputError error={errors.email.message} />}
      </div>

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.first_name?.message && (
          <InputError error={errors.first_name.message} />
        )}
      </div>

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Lastname is required",
            minLength: {
              value: 3,
              message: "Lastname must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.last_name?.message && (
          <InputError error={errors.last_name.message} />
        )}
      </div>

      {updateForm && (
        <div>
          <Label htmlFor="job_title">Job Title</Label>
          <Input
            type="text"
            id="job_title"
            placeholder="Enter Job Title"
            {...register("job_title", {
              required: "Job title is required",
              minLength: {
                value: 3,
                message: "Your job title must be at least 3 characters",
              },
            })}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
          />
          {errors?.job_title?.message && (
            <InputError error={errors.job_title.message} />
          )}
        </div>
      )}

      {updateForm && (
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us more about you"
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 10,
                message: "The bio must be at least 10 characters",
              },
            })}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px] w-[300px] text-justify"
          />
          {errors?.bio?.message && <InputError error={errors.bio.message} />}
        </div>
      )}

      {updateForm && (
        <div className="w-full">
          <Label htmlFor="profile_picture">Profile Picture</Label>
          <Input
            type="file"
            id="picture"
            {...register("profile_picture", {
              required: "Profile picture is required",
            })}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
          />
          {errors?.profile_picture?.message && (
            <InputError error={errors.profile_picture.message} />
          )}
        </div>
      )}

      {updateForm || (
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="text"
            id="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
          />
          {errors?.password?.message && (
            <InputError error={errors.password.message} />
          )}
        </div>
      )}

      {updateForm || (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
          />
          {errors?.confirmPassword?.message && (
            <InputError error={errors.confirmPassword.message} />
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-center flex-col my-4">
        {updateForm ? (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                {" "}
                <SmallSpinner />
                <SmallText message={"Updating Info..."} />
              </>
            ) : (
              <SmallText message={"Update"} />
            )}
          </button>
        ) : (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                {" "}
                <SmallSpinner />
                <SmallText message={"Creating user..."} />
              </>
            ) : (
              <SmallText message={"Signup"} />
            )}
          </button>
        )}
        {updateForm || (
          <p className="text-[14px] mt-4">Already have an account? Login</p>
        )}
      </div>
    </form>
  );
};

export default SignUpPage;
