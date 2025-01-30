import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePagination from "@/ui_components/PagePagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getBlogs(page),
    placeholderData: keepPreviousData,
  });

  console.log(data);
  const blogs = data?.results || [];
  const numPages = Math.ceil(data?.count / blogsPerPage);

  function handleSetPage(value) {
    setPage(value);
    console.log(page);
  }

  return (
    <>
      <Header />
      <BlogContainer isPending={isPending} blogs={blogs} />
      <PagePagination
        numPages={numPages}
        handleSetPage={handleSetPage}
        page={page}
      />
    </>
  );
};

export default HomePage;
