import { URL } from "../url";
import axios from "axios";

export const getPosts = async (searchText) => {
  try {
    const response = await axios.get(URL + "/api/posts/" + searchText);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(URL + "/api/auth/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const searchPosts = async () => {
  try {
    const response = await axios.get(URL + "/api/posts");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const fetchPosts = async (id) => {
  try {
    const response = await axios.get(URL + `/api/posts/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

// CREATE POST

export const createNewPost = async (data) => {
  try {
    const response = await axios.post(URL + `/api/posts/write-post`, data, {
      withCredentials: true,
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const editPost = async (data, id) => {
  try {
    const response = await axios.put(URL + `/api/posts/${id}`, data, {
      withCredentials: true,
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const uploadImage = async (data) => {
  try {
    const response = await axios.post(URL + "/api/upload", data);
    if (response.status === 2000) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const deletePost = async (id) => {
  try {
    const result = await axios.delete(URL + `/api/posts/${id}`);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

/* COMMMENTS */

export const createNewComment = async (data) => {
  try {
    const response = await axios.post(URL + `/api/comments/write-cmt`, data, {
      withCredentials: true,
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const fetchComments = async (id) => {
  try {
    const response = await axios.get(URL + `/api/comments/post/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const deleteComment = async (id) => {
  try {
    const result = await axios.delete(URL + `/api/comments/${id}`);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const editComments = async (data, id) => {
  console.log(data, id);
  try {
    const response = await axios.put(URL + `/api/comments/${id}`, data, {
      withCredentials: true,
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

export const getPostsOfEachUser = async (userId) => {
  console.log("user id called ");
  try {
    const response = await axios.get(URL + "/api/posts/user/" + userId);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};
