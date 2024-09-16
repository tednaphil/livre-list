import './ShelfCtrl.css';
import { Select, Stack, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  setSort: (orientation: string) => void;
}

function ShelfCtrl({ setSort }: Props) {
  const [newShelf, setNewShelf] = useState<string>('');

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(e.target.value)
  }
    return(
        <>
          <h2>Sort</h2>
          <Select size='sm' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {handleSort(e)}}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewShelf(e.target.value)}}/>
            <Button colorScheme='orange'>Submit</Button>
            </Stack>
          </form>
        </>
    )
}

export default ShelfCtrl