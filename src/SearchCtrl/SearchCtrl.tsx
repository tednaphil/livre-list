import './SearchCtrl.css';
import { Book } from '../Util/Interfaces';
import { Select, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';

interface Props {
  setResults: (books: Book[]) => void;
  results: Book[]
}

function SearchCtrl({setResults, results}: Props) {
  //on change or selection of options, update results by invoking setResults
  //with altered data

    return(
        <>
        {/* <section className='sort-filter'> */}
          <h2>Sort</h2>
          <Select size='sm'>
            <option value='ascending'>A-Z by title</option>
            <option value='descending'>Z-A by title</option>
          </Select>
          <h2>Filter</h2>
          <CheckboxGroup colorScheme='orange' defaultValue={[]}>
            <Stack spacing={[1, 2]} direction={['column']}>
              <Checkbox value='ebook'>Ebooks</Checkbox>
              <Checkbox value='term2'>Filter Term 2</Checkbox>
              <Checkbox value='term3'>Filter Term 3</Checkbox>
            </Stack>
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl