import Badge from "./Badge";
import CardFooter from "./CardFooter";
import thumbnail from "../images/goat.jpg";

const BlogCard = () => {
  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <div className="w-full h-[200px] border rounded-md overflow-hidden">
        <img
          src={thumbnail}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <Badge />
      <h3 className="font-semibold leading-normal text-[#181A2A] mb-0 dark:text-white">
        Why Lebron James is the Undisputed Goat
      </h3>

      <CardFooter />
    </div>
  );
};

export default BlogCard;
