import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { ImCross } from "react-icons/im";
import {
  createNewPost,
  uploadImage,
  fetchPosts,
  editPost,
} from "../services/apilist";
const CreatePost = () => {
  const { state } = useLocation();
  const user = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      setIsEdit(true);
      fetchPosts(state.id)
        .then((res) => {
          console.log(res);
          setDesc(res.desc);
          setTitle(res.title);
          setCategoryList(res.categories);
          setFile(res.photo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();

  const addCategory = () => {
    setCategoryList([category, ...categoryList]);
    setCategory("");
  };

  const removeCategory = (category) => {
    const res = categoryList.filter((item) => item !== category);
    console.log(res);
    setCategoryList(res);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const dataPost = {
      title: title,
      desc: desc,
      username: localStorage.getItem("username"),
      userId: user.user?._id,
      categories: categoryList,
    };
    /* for edit  */
    if (isEdit) {
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("img", fileName);
        data.append("file", file);
        dataPost.photo = fileName;
        uploadImage(data)
          .then((res) => console.log("OUTPUT: ", res))
          .catch((err) => console.log(err));
      }

      editPost(dataPost, state.id)
        .then((res) => {
          console.log("OUTPUT: ", res);
          navigate(`/posts/post/${res._id}`);
        })
        .catch((err) => console.log(err));
    }
    /* for edit  */

    if (!isEdit) {
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;

        data.append("img", fileName);
        data.append("file", file);
        dataPost.photo = fileName;

        uploadImage(data)
          .then((res) => console.log("OUTPUT: ", res))
          .catch((err) => console.log(err));
      }

      createNewPost(dataPost)
        .then((res) => {
          console.log("OUTPUT: ", res);
          navigate(`/posts/post/${res._id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="px-6 md:px-[200px] mt-8 py-2">
      <h1 className="font-bold md:text-2xl text-xl">
        {!isEdit ? "Add a new" : "Edit "} post
      </h1>
      <form
        className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
        onSubmit={formHandler}
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter post title"
          className="px-4 py-2 outline-none"
          value={title}
          style={{ border: "1px solid black" }}
        />

        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className="px-4"
          accept="image/*"
          style={{ border: "1px solid black" }}
          // value={file}
        />
        {console.log(file)}
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              className="px-4 py-2 outline-none"
              placeholder="Enter post category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ border: "1px solid black" }}
            />
            <div
              onClick={addCategory}
              className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
            >
              Add
            </div>
          </div>

          <div className="flex px-4 mt-2">
            {categoryList?.map((c, i) => (
              <div
                key={i}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
              >
                <p>{c}</p>
                <p
                  onClick={() => removeCategory(c)}
                  className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                >
                  <ImCross />
                </p>
              </div>
            ))}
          </div>
        </div>
        <textarea
          rows={7}
          cols={30}
          onChange={(e) => setDesc(e.target.value)}
          className="px-4 py-2 outline-none"
          placeholder="Enter post description"
          style={{ border: "1px solid black" }}
          value={desc}
        />
        <button
          // onClick={handleCreate}
          type="submit"
          className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
        >
          {!isEdit ? "Submit" : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
