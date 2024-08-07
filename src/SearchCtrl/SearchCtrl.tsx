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

  const sortResults = (books: Book[], direction: string) => {
    if(direction === 'descending') {
      //return results sorted in descending alphabetical order
      return books.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      //return array of results sorted in ascending alphabetical order
      return books.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  const handleSort = (e: any,) => {
    e.preventDefault()
    const sortedResults = sortResults(results, e.target.value);
    setResults(sortedResults)
  }

    return(
        <>
        {/* <section className='sort-filter'> */}
          <h2>Sort</h2>
          <Select size='sm' onChange={(e) => {handleSort(e)}}>
            <option value='ascending'>A-Z by title</option>
            <option value='descending'>Z-A by title</option>
          </Select>
          <h2>Filter</h2>
          <CheckboxGroup colorScheme='orange' defaultValue={[]}>
            <Stack spacing={[1, 2]} direction={['column']}>
              <Checkbox value='ebook'>Ebooks</Checkbox>
              <Checkbox value='purchaseable'>Purchaseable</Checkbox>
              {/* <Checkbox value='term3'>Filter Term 3</Checkbox> */}
            </Stack>
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl