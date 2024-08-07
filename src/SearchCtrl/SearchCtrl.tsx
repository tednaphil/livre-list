import './SearchCtrl.css';
import { Select, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';


interface Props {
  setSort: (orientation: string) => void;
  setFilter: (conditions: string[]) => void;
  filter: string[] | null;
}

function SearchCtrl({ setSort, setFilter, filter }: Props) {
  const handleSort = (e: any,) => {
    setSort(e.target.value)
  }

  const handleFilter = (e: any, term: string) => {
    // if(!filter?.includes(e.target.value)) {
    //   return filter
    // } else {
    //   setFilter([...filter, e.target.value])
    // }
    // if(!filter) {
    //   setFilter([e.target.value])
    // } else if(filter) {
    //   setFilter([...filter, e.target.value])
    // }
    console.log(e)
    if(e.target.checked && !filter) {
      setFilter([term])
    } else if(e.target.checked && filter) {
      setFilter([...filter, term])
    }
    // if(e.target.checked) {
    //   setFilter([term])
    // }

    //remove from filter array if box is checked then unchecked
    //add to filter array if box is checked not already in array and 

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
              <Checkbox value='ebook' onChange={(e) => {handleFilter(e, 'ebook')}}>Ebooks</Checkbox>
              <Checkbox value='purchaseable' onChange={(e) => {handleFilter(e, 'purchaseable')}}>Purchaseable</Checkbox>
              {/* <Checkbox value='term3'>Filter Term 3</Checkbox> */}
            </Stack>
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl