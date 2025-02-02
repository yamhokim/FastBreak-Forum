import { getUserInfo } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Spinner from "@/ui_components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  console.log(username);

  const { isPending, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
  });

  const blogs = data?.author_posts;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <Hero userInfo={data} />
      <BlogContainer blogs={blogs} title={`📫 ${username}'s Post`} />
    </>
  );
};

export default ProfilePage;
