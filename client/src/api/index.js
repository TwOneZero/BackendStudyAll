import axios from 'axios';

const BASE_URL = axios.create({ baseURL: 'http://localhost:5000' });

BASE_URL.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchPosts = () => BASE_URL.get('/posts');
export const createPost = (newPost) => BASE_URL.post('/posts', newPost);
export const likePost = (id) => BASE_URL.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => BASE_URL.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => BASE_URL.delete(`/posts/${id}`);

export const signIn = (formData) => BASE_URL.post('/user/signin', formData);
export const signUp = (formData) => BASE_URL.post('/user/signup', formData);