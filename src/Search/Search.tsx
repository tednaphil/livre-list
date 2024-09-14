import './Search.css';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/search/${keyword}`, { state: keyword });
    setKeyword('');
  }

    return(
        <>
          <form className='search-form' onSubmit={(e: React.FormEvent<HTMLFormElement>) => {submitSearch(e)}}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300'/>
              </InputLeftElement>
              <Input type='text'
              placeholder='search'
              required
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setKeyword(e.target.value)}}
              />
            </InputGroup> 
          </form>
        </>
    )
}

export default Search