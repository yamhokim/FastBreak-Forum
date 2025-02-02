import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import InputError from "@/ui_components/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallText from "@/ui_components/SmallText";

const CreatePostPage = () => {
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => createBlog(data),
    onSuccess: () => {
      toast.success("You have successfully created an blog post 👍");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.contents);
    formData.append("category", data.category);
    if (data.featured_image) {
      formData.append("featured_image", data.featured_image[0]);
    }

    mutation.mutate(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl max-sm:text-xl">Create Post</h3>

        <p className="max-sm:text-[14px]">
          Create a new post and share your ideas
        </p>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "The blog post must have a title",
            minLength: {
              value: 3,
              message: "The title must be at least 3 characters",
            },
          })}
          placeholder="Give you post a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      <div>
        <Label htmlFor="contents">Content</Label>
        <Textarea
          id="content"
          {...register("contents", {
            required: "The blog post must have contents",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          placeholder="Write your blog post"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify max-sm:w-[300px] max-sm:text-[14px]"
        />
        {errors?.contents?.message && (
          <InputError error={errors.contents.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="category">Category</Label>

        <Select
          {...register("category", {
            required: "The blog post must have a category",
          })}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Economy">Economy</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors?.category?.message && (
          <InputError error={errors.category.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="featured_image">Featured Image</Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: "The blog post must have a featured image",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />
        {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {mutation.isPending ? (
            <>
              <SmallSpinner />
              <SmallText message={"Creating Post..."} />
            </>
          ) : (
            <SmallText message={"Create Post"} />
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePostPage;
