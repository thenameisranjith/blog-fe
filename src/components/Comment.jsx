/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import {
  createNewComment,
  fetchComments,
  deleteComment,
  editComments,
} from "../services/apilist";

const Comment = ({ postId }) => {
  const user = useContext(UserContext);
  const [editStatus, setEditStatus] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  useEffect(() => {
    if (editStatus) {
      console.log("323 -- ", editStatus);
      const res = commentList.find((item) => item._id === commentId);
      setComment(res.comment);
      setCommentId(res._id);
    }
  }, [editStatus, commentId]);

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  const getComments = (postId) => {
    fetchComments(postId)
      .then((res) => {
        setCommentList(res);
      })
      .catch((err) => console.log(err));
  };

  const addNewComment = () => {
    const data = {
      comment: comment,
      author: localStorage.getItem("username"),
      postId: postId,
      userId: user.user._id,
    };

    if (editStatus) {
      editComments(data, commentId)
        .then((res) => {
          console.log(res);
          setComment("");
          getComments(postId);
          setEditStatus(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createNewComment(data)
        .then((res) => {
          console.log(res);
          setComment("");
          getComments(postId);
          setEditStatus(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteComment = (id) => {
    deleteComment(id)
      .then((res) => {
        console.log(res);
        getComments(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (id) => {
    setEditStatus(!editStatus);
    setCommentId(id);
  };

  return (
    <>
      {commentList.length > 0 && (
        <div className="px-2 py-3 bg-gray-200 rounded-lg my-1">
          {commentList?.map((item) => (
            <div key={item._id}>
              <div className="flex items-center">
                <h3 className="font-bold text-gray-600">@{item.author}</h3>
                <p className="text-gray-500 text-sm">
                  &nbsp; {new Date(item.createdAt).toString().slice(4, 15)}
                  {new Date(item.createdAt).toString().slice(15, 21)}
                </p>
              </div>
              <p>{item.comment}</p>
              {user.user._id === item.userId ? (
                <div className="flex  space-x-3">
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => editHandler(item._id)}
                  />
                  <MdDelete
                    className="cursor-pointer"
                    onClick={() => handleDeleteComment(item._id)}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="px-2 py-3 bg-gray-200 rounded-lg my-1">
        <div className="w-full flex flex-col mt-4 py-2 md:flex-row">
          <input
            type="text"
            placeholder="write a comment"
            className="md:w-[80%] outline-none py-2 px-4  mt-4 md:mt-0"
            style={{ border: "1px solid black" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            onClick={addNewComment}
          >
            {!editStatus ? "Add Comment" : "Edit Comment"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Comment;
