import profile_pic from "../images/king_bron.jpg";

const BlogAuthor = () => {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={profile_pic}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">Lebron James</small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        January 27, 2025
      </small>
    </div>
  );
};

export default BlogAuthor;
