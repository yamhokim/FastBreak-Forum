import { getUserInfo } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  console.log(username);

  const query = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
  });

  console.log(query);

  return (
    <>
      <Hero />
      <BlogContainer />
    </>
  );
};

export default ProfilePage;
