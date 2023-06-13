import React from 'react';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch} from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import noImage from '../../../images/no_image.jpg';

//const Post = (props) 대신 ({post})
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like ===  user?.result?._id )
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile || noImage } />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <CardContent>
        <Typography variant='caption' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography className={classes.title} variant='h6' style={{ fontWeight: 'bold' }}>
            {post.title}
        </Typography>
        <Typography className={classes.details}  variant='body2' paragraph>
          {post.message}
        </Typography>
      </CardContent>
      {user?.result?._id === post?.creator && (
        <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      )}
      
        
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" 
          disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {/* user가 작성한 post만 삭제 가능하게 */}
        {user?.result?._id === post?.creator && (
          <Button
          size='small'
          color='primary'
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
