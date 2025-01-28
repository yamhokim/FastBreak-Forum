import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const {
    isPending,
    isError,
    data: blogs,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // console.log(blogs);

  return (
    <>
      <Header />
      <BlogContainer isPending={isPending} blogs={blogs} />
    </>
  );
};

export default HomePage;
