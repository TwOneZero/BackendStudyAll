import axios from 'axios';


const BASE_URL = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });


BASE_URL.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => BASE_URL.get(`/posts/${id}`);
export const fetchPosts = (page) => BASE_URL.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => BASE_URL.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
export const createPost = (newPost) => BASE_URL.post('/posts', newPost);
export const likePost = (id) => BASE_URL.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => BASE_URL.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => BASE_URL.delete(`/posts/${id}`);

export const signIn = (formData) => BASE_URL.post('/user/signin', formData);
export const signUp = (formData) => BASE_URL.post('/user/signup', formData);