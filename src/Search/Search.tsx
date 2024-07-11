import './Search.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  function submitSearch(e: any) {
    e.preventDefault();
    navigate(`/search/${keyword}`, { state: keyword });
    setKeyword('');
  }

    return(
        <>
          <form onSubmit={(e) => {submitSearch(e)}}>
            <input type='text' placeholder='search' required value={keyword} onChange={(e) => {setKeyword(e.target.value)}}></input>  
          </form>
        </>
    )
}

export default Search