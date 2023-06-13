import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
// import { Pagination } from '@material-ui/lab';
import Paginate from '../Pagination';
import {useNavigate, useLocation } from 'react-router-dom'
import TagsInput from '../TagsInput';

const useQuery =() => {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search , setSearch] = useState('');
  const [tags , setTags] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery =query.get('searchQuery');

  useEffect( () => {
    dispatch(getPosts());
  }, [dispatch]);

  
  const searchPosts = () => {
    if(search.trim() || tags){
      const tagsString = tags.join(',');
      // dispatch -> fetch search posts
      dispatch(getPostsBySearch({search, tags: tagsString}))
      
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tagsString || 'none'}`)
    } else {
      navigate('/');
    }
  }

  const handleKeyDown =(e) => {
    if(e.key === "Enter"){
       searchPosts();
    }
  }

  const handleSelecetedTags = (item) => {
    console.log(item);
  }


  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          className={classes.gridContainer}
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search memories' fullWidth value={search} onKeyDown={handleKeyDown} onChange={(e) => {setSearch(e.target.value)}}  style={{marginBottom : '10px'}}/>
              <TagsInput
                selectedTags={handleSelecetedTags}
                fullWidth
                variant="outlined"
                id="tags"
                name="tags"
                placeholder="add Tags"
                label="tags"
                tags={tags}
                setTags={setTags}
              />
              <Button onClick={searchPosts} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper  elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
