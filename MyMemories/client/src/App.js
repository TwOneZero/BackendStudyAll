import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetail';

const App = () => {
  
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/posts' />} />
          <Route exact path='/posts' element={<Home />}/>
          <Route exact path='/posts/search' element={<Home />}/>
          <Route exact path='/posts/:id' element={<PostDetails />}/>
          {/* TO-DO : Wrapping Auth route */}
          <Route exact path='/auth' element={<Auth />} /> 
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
