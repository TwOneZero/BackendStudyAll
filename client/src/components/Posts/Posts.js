import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  // console.log(posts);
  return (
    //posts not exist
    !posts.length ? (
      // <CircularProgress />
      <div></div>
    ) : (
      <Grid
        className={classes.mainContainer}
        container
        alignItems='stretch'
        spacing={3}
      >
        {/*map 에서 중괄호가 아닌 소괄호로 감싸야 함 (logic 이 아닌 return) */}
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
