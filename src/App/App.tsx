import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from '../Home/Home';
import Search from '../Search/Search';
import Results from '../Results/Results';
import BookProfile from '../BookProfile/BookProfile';
import Shelves from '../Shelves/Shelves';
import Shelf from '../Shelf/Shelf';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  return (
    <>
    <nav>
      <h1>LivreList</h1>
      <Search/>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/shelves'>Shelves</NavLink>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shelves' element={<Shelves/>}/>
      <Route path='/shelves/:shelfname' element={<Shelf/>}/>
      <Route path='/search/:term' element={<Results/>}/>
      <Route path='/books/:title' element={<BookProfile/>}/>
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
    </>
  );
}

export default App;
