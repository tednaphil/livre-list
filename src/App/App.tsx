import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  return (
    <>
    <h1>LivreList</h1>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
    </>
  );
}

export default App;
