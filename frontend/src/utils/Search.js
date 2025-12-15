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
import { set } from 'mongoose';


  

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


const Search = ({pageReloaded}) => {
  // const dispatch = useDispatch();
  // const {stateStore} = useSelector(state => state)
  // const {keyword} = stateStore
  const [search, setSearch] = useState('')
    // const [searchTimeout, setSearchTimeout] = useState(null);
    // const searchInputRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      setSearch('')
    }, [pageReloaded])

    const handleSearchSubmit = () => {
      const keyparam = new URLSearchParams(location.search)
        if(search.trim()){
            keyparam.set('search', search)
            navigate(`?search=${search}`);
        }else{
          keyparam.delete('search');
        }
        // dispatch(setKeyword(search))

    }
    const handleKeywordChange = (e) => {
        setSearch(e.target.value)
    }
    
  return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', borderRadius: '20px', border: '1px solid', borderColor: 'background.paper'  }}>

<StyledInputBase
        sx={{ ml: 1, flex: 1,   color: 'text.primary' }}
        placeholder="Search For Products…"
        inputProps={{ 'aria-label': 'search for products' }}
        onChange={handleKeywordChange}
        value={search}

        
      />
      <SearchButton type="button" sx={{ p: '10px'}} aria-label="search"
      onClick={()=>handleSearchSubmit()}>
        <SearchIcon />
      </SearchButton>
            </Box>
  )
}

export default Search