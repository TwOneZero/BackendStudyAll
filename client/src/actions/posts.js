import * as api from '../api';
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
} from '../constants/actionTypes';

//Action creaters
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page); 
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
}

//create Post
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//update Post
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
