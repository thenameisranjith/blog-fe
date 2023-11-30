/* eslint-disable react/prop-types */
import { IMAGE_FOLDER } from "../url";
const ProfilePost = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.map((item) => (
        <div className="w-full flex mt-8 space-x-4" key={item._id}>
          <div className="w-[35%] h-[200px] flex justify-center items-center">
            <img
              src={IMAGE_FOLDER + item.photo}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col w-[65%]">
            <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
              {item.title}
            </h1>
            <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
              <p>@{item.username}</p>
              <div className="flex space-x-2 text-sm">
                <p>{new Date(item.createdAt).toString().slice(0, 15)}</p>
                <p>{new Date(item.createdAt).toString().slice(15, 21)}</p>
              </div>
            </div>
            <p className="text-sm md:text-lg">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePost;
