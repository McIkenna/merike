import React, {useState, useEffect, useRef} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import {useNavigate, useLocation} from 'react-router-dom'
import {Button, Box} from '@mui/material';
import {grey, green, red} from "@mui/material/colors";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector} from'react-redux';
import { setKeyword } from '../api/actions';


  

  const SearchButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        color: grey[500]
      },
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


const Search = () => {
  const dispatch = useDispatch();
  const {stateStore} = useSelector(state => state)
  const {keyword} = stateStore
    const [searchTimeout, setSearchTimeout] = useState(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation()

    const handleSearchSubmit = () => {
      const keyparam = new URLSearchParams(location.search)
        if(keyword.trim()){
            keyparam.set('search', keyword)
            navigate(`?search=${keyword}`);
        }else{
          keyparam.delete('search');
        }
       

    }
    const handleKeywordChange = (e) => {
        e.preventDefault();
        
        dispatch(setKeyword(e.target.value))

        // if (searchTimeout) {
        //     clearTimeout(searchTimeout);
        //   }
      
        //   // Set a new timeout for 4 seconds after the user stops typing
        //   setSearchTimeout(
        //     setTimeout(() => {
        //         handleSearchSubmit(keyword)
        //       // Your search logic here
        //       console.log('Search triggered:', );
        //     }, 4000)
        //   );

    }
    
  return (
        <Box sx={{ display: 'flex', backgroundColor: grey[200], borderRadius: '20px'}}>

<StyledInputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleKeywordChange}
        value={keyword}
        
      />
      <SearchButton type="button" sx={{ p: '10px' }} aria-label="search"
      onClick={handleSearchSubmit}>
        <SearchIcon />
      </SearchButton>
            </Box>
  )
}

export default Search