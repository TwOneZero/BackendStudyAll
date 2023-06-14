import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    case FETCH_ALL:
      return {
        ...state,
        posts : action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts : action.payload,
      }
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case CREATE:
      return {...state, posts: [...state.posts, action.payload] };
    case UPDATE:
    case LIKE:
      //기존 post의 id 와 같다면 업데이트된 post return
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case DELETE:
      //삭제될 id 를 가진 post 만 제외하고 return
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};
