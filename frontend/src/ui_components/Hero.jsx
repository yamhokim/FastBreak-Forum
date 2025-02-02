import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BASE_URL } from "@/api";
import { HiPencilAlt } from "react-icons/hi";

const Hero = ({ userInfo, authUsername, toggleModal }) => {
  return (
    <div className="padding-x py-9 max-container flex flex-col items-center justify-center gap-4 bg-[#F6F6F7] dark:bg-[#242535] rounded-md">
      <div className="flex gap-4">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${userInfo?.profile_picture}`}
            className="w-[70px] h-[70px] rounded-full object-cover"
          />
        </div>

        <span>
          <p className="text-[18px] text-[#181A2A] dark:text-white">
            {userInfo?.first_name} {userInfo?.last_name}
          </p>
          <p className="text-[14px] text-[#3B3C4A] dark:text-[#97989F]">
            {`@${userInfo?.username}`}
          </p>
          <p className="text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]">
            {userInfo?.job_title || "Collaborator & Editor"}
          </p>
        </span>

        {userInfo?.username === authUsername && (
          <span>
            <HiPencilAlt
              onClick={toggleModal}
              className="dark:text-white text-2xl cursor-pointer"
            />
          </span>
        )}
      </div>

      <p className="text-[#3B3C4A] text-[16px] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]">
        {userInfo?.bio}
      </p>

      <div className="flex gap-4 justify-center items-center text-white text-xl">
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaInstagram />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaFacebookF />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <BsTwitterX />
        </div>
        <div className="w-[40px] h-[40px] rounded-lg bg-[#696A75] flex justify-center items-center">
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};

export default Hero;
