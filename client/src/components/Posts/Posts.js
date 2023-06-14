import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid,  Paper, Typography } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
import { useLocation} from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
const Posts = ({ setCurrentId }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  /**
   * 검색 후 새로고침, 뒤로가기 할 때만 dispatch
   * -> paginate 에서 posts를 fetching 하고 있기 때문
   */
  useEffect(() =>{
    if(location.search.includes('searchQuery')){
      const [searchKey, tagsKey] = location.search.split('&');
      const search =searchKey.split('=')[1];
      const tags = tagsKey.split('=')[1];
      dispatch(getPostsBySearch({search, tags}))
    }
  },[dispatch, location.search])


  if (!posts.length && !isLoading ) {
    return (
      <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            There is no posts
          </Typography>
        </Paper>
    )
  };

  return (
    //posts not exist
    isLoading ? (
      <CircularProgress />    
    ) : (
      <Grid
        className={classes.mainContainer}
        container
        alignItems='stretch'
        spacing={3}
      >
        {/*map 에서 중괄호가 아닌 소괄호로 감싸야 함 (logic 이 아닌 return) */}
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
