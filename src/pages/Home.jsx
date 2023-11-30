import HomePost from "../components/HomePost";
import Loader from "../components/Loader";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getPosts } from "../services/apilist";
import "./page.css";
const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const user = useContext(UserContext);
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    getPosts(search ? search : "")
      .then((res) => {
        setPosts(res);
        setLoading(false);
      })
      .catch((err) => console.log("Error:", err));
  }, [search]);

  return (
    <div className="px-10 md:px-[100px]">
      {loading ? (
        <div className="center">
          <Loader />
        </div>
      ) : post.length > 0 ? (
        <>
          <HomePost post={post} userData={user} />
        </>
      ) : (
        <p className="text-sm md:text-lg" style={{ textAlign: "center" }}>
          No post avilable{" "}
        </p>
      )}
    </div>
  );
};

export default Home;
