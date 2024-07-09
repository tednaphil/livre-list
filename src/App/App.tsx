import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  return (
    <>
    <nav>
      <h1>LivreList</h1>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
    </>
  );
}

export default App;
