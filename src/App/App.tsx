import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Results from '../Results/Results';
import BookProfile from '../BookProfile/BookProfile';
import Shelves from '../Shelves/Shelves';
import Shelf from '../Shelf/Shelf';
import ErrorPage from '../ErrorPage/ErrorPage';
import Nav from '../Nav/Nav';

function App() {

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shelves' element={<Shelves/>}/>
      <Route path='/shelves/:id' element={<Shelf/>}/>
      <Route path='/search/:term' element={<Results/>}/>
      <Route path='/books/:id' element={<BookProfile/>}/>
      <Route path='*' element={<ErrorPage error='Page Not Found'/>}/>
    </Routes>
    </>
  );
}

export default App;
