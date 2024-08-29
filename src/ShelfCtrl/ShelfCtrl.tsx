import './ShelfCtrl.css';
import { Select, Stack, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  setSort: (orientation: string) => void;
}

function ShelfCtrl({ setSort }: Props) {
  const [newShelf, setNewShelf] = useState('');

  const handleSort = (e: any,) => {
    setSort(e.target.value)
  }
    return(
        <>
          <h2>Sort</h2>
          <Select size='sm' onChange={(e) => {handleSort(e)}}>
            <option value='ascending'>A-Z by title</option>
            <option value='descending'>Z-A by title</option>
          </Select>
          <h2>Create a New Shelf</h2>
          <form>
            <Stack>
            <Input type='text'
            placeholder='Loaned Books'
            required
            value={newShelf}
            onChange={(e) => {setNewShelf(e.target.value)}}/>
            <Button colorScheme='orange'>Submit</Button>
            </Stack>
          </form>
        </>
    )
}

export default ShelfCtrl