import { ReactEventHandler } from 'react';
import './SearchCtrl.css';
import { Select, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';


interface Props {
  setSort: (orientation: string) => void;
  setFilters: (conditions: string[]) => void;
  filters: string[] | null;
}

function SearchCtrl({ setSort, setFilters, filters }: Props) {
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(e.target.value)
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(e.target.checked && !filters) {
      setFilters([e.target.value])
    } else if(e.target.checked && filters) {
      setFilters([...filters, e.target.value])
    } else if(!e.target.checked && filters) {
      const updatedFilters = filters.filter((el: string) => !(el === e.target.value))
      setFilters(updatedFilters)
    }
  }

    return(
        <>
        {/* <section className='sort-filter'> */}
          <h2>Sort</h2>
          <Select size='sm' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {handleSort(e)}}>
            <option value='ascending'>A-Z by title</option>
            <option value='descending'>Z-A by title</option>
          </Select>
          <h2>Filter</h2>
          <CheckboxGroup colorScheme='orange' defaultValue={[]}>
            <Stack spacing={[1, 2]} direction={['column']}>
              <Checkbox id="purchaseable-filter" value='purchaseable' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Purchaseable</Checkbox>
              <Checkbox id="fiction-filter" value='Fiction' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Fiction</Checkbox>
              <Checkbox id="nonfiction-filter" value='Nonfiction' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Non-Fiction</Checkbox>
              <Checkbox id='childrens-filter' value='Juvenile' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Children's Literature</Checkbox>
            </Stack>
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl