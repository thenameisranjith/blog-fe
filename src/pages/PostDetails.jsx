import { useEffect, useState, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts, deletePost } from "../services/apilist";
import { IMAGE_FOLDER } from "../url";
import { UserContext } from "../context/UserContext";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
const PostDetails = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const postId = useParams().id;
  const [post, setPost] = useState({});

  useEffect(() => {
    fetchPosts(postId)
      .then((res) => {
        setPost(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(true);
      });
  }, [postId]);

  const handleDeletePost = (id) => {
    deletePost(id)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user.user._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    navigate("/write", {
                      state: { id: post._id },
                    })
                  }
                >
                  <BiEdit />
                </p>
                {console.log(post._id)}
                <p
                  className="cursor-pointer"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.createdAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.createdAt).toString().slice(15, 21)}</p>
            </div>
          </div>
          <img
            src={IMAGE_FOLDER + post.photo}
            alt={post.photo}
            style={{ height: "500px", width: "900px" }}
          />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories.map((c) => (
                <div
                  key={Math.random() * 100}
                  className="bg-gray-300 rounded-lg px-3 py-1"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            <Comment postId={postId} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
