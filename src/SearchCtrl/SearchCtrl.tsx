import './SearchCtrl.css';
import { Select, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';


interface Props {
  setSort: (orientation: string) => void;
  setFilters: (conditions: string[]) => void;
  filters: string[] | null;
}

function SearchCtrl({ setSort, setFilters, filters }: Props) {
  const handleSort = (e: any,) => {
    setSort(e.target.value)
  }

  const handleFilter = (e: any, term: string) => {
    if(e.target.checked && !filters) {
      setFilters([term])
    } else if(e.target.checked && filters) {
      setFilters([...filters, term])
    } else if(!e.target.checked && filters) {
      const updatedFilters = filters.filter((el: any) => !(el === term))
      setFilters(updatedFilters)
    }
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
              {/* <Checkbox value='ebook' onChange={(e) => {handleFilter(e, 'ebook')}}>Ebooks</Checkbox> */}
              <Checkbox value='purchaseable' onChange={(e) => {handleFilter(e, 'purchaseable')}}>Purchaseable</Checkbox>
              {/* <Checkbox value='term3'>Filter Term 3</Checkbox> */}
            </Stack>
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl