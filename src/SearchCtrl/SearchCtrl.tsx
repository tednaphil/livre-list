import './SearchCtrl.css';
import { FilterValues } from '../Util/Interfaces';
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

  const checkboxes: JSX.Element[] = Object.keys(FilterValues)
    .map((key, index) => {
      const values = Object.values(FilterValues)
      return (
          <Checkbox key={key} id={`${key}-filter`} value={values[index]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>{key[0].toUpperCase() + key.slice(1)}</Checkbox>
            )
    });

  // const checkboxes: JSX.Element[] = Object.keys(FilterValues)
  //   .map((key) => {
  //     return (
  //         <Checkbox key={key} id={`${key}-filter`} value={key} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>{key}</Checkbox>
  //           )
  //   });

  // const checkboxes = () => {
  //   let elements: JSX.Element[] = [];
  //   forIn(FilterValues, (value, key) => {
  //     elements.push(
  //       <Checkbox key={key} id={`${key}-filter`} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>{key[0].toUpperCase() + key.slice(1)}</Checkbox>
  //     )
  //   })
  //   return elements
  // }

  // const checkboxes = () => {
  //   return forIn(FilterValues, (value, key) => {
  //     return(
  //       <Checkbox key={key} id={`${key}-filter`} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>{key[0].toUpperCase() + key.slice(1)}</Checkbox>
  //     )
  //   })
  // }



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
              {/* <Checkbox id="purchaseable-filter" value='purchaseable' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Purchaseable</Checkbox>
              <Checkbox id="fiction-filter" value='Fiction' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Fiction</Checkbox>
              <Checkbox id="nonfiction-filter" value='Nonfiction' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Non-Fiction</Checkbox>
              <Checkbox id='childrens-filter' value='Juvenile' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleFilter(e)}}>Children's Literature</Checkbox> */}
              {checkboxes}
            </Stack> 
          </CheckboxGroup>
        {/* </section> */}
        </>
    )
}

export default SearchCtrl