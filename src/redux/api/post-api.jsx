import axios from "axios";
import { setLoading, setPost, setPostDetail } from "../action/glocalAction";
import ConfigSite from "../../config/config";

const getPost = (search) => async (dispatch) => {
  dispatch(setLoading(true));
  if (!search) {
    await axios
      .get(`${ConfigSite.url}/post`)
      .then((response) => {
        dispatch(setPost(response.data.post));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.status === 401) {
          dispatch(setPost([]));
        }
        dispatch(setLoading(false));
      });
  } else {
    await axios
      .get(`${ConfigSite.url}/post?search=${search}`)
      .then((response) => {
        dispatch(setPost(response.data.post));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.status === 401) {
          dispatch(setPost([]));
        }
        dispatch(setLoading(false));
      });
  }
};

const detailPost = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios
    .get(`${ConfigSite.url}/post/${id}`)
    .then((response) => {
      dispatch(setPostDetail(response.data.post));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

const createPost = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios
    .post(`${ConfigSite.url}/post/create`, data)
    .then((response) => {
      dispatch(getPost());
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

const updatePost = (data, id) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios
    .put(`${ConfigSite.url}/post/update/${id}`, data)
    .then((response) => {
      dispatch(getPost());
      dispatch(setPostDetail(""));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

const deletePost = (id, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  await axios
    .delete(`${ConfigSite.url}/post/delete/${id}`)
    .then((response) => {
      dispatch(setLoading(false));
      dispatch(getPost());
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

export { getPost, deletePost, createPost, detailPost, updatePost };
