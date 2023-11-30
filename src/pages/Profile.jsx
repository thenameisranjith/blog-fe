import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import ProfilePost from "../components/ProfilePost";

import { getPostsOfEachUser } from "../services/apilist";

const Profile = () => {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  console.log("profile page", user);

  useEffect(() => {
    getPostsOfEachUser(user?.user._id)
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.user._id]);

  return (
    <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
      <div className="flex flex-col md:w-[90%] w-full mt-8 md:mt-0">
        <h1 className="text-xl font-bold mb-4">Your posts:</h1>

        <ProfilePost posts={posts} />

        {/* <PostDetails /> */}
      </div>
    </div>
  );
};

export default Profile;
