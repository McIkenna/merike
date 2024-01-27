import React, {useState, useEffect, useRef} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import {Button, Box} from '@mui/material';
import {grey, green, red} from "@mui/material/colors";

const SearchDiv = styled('div')(({ theme }) => ({
    // position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.default, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.default, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.background.paper,
  }));

  const SearchButton = styled(Button)(({ theme }) => ({
    // height: '100%',
    // position: 'absolute',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.background.default,
    backgroundColor: green[600],
    '&:hover': {
        backgroundColor: alpha(green[600], 0.85),
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
    const [keyword, setKeyword] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate()

    const handleSearchSubmit = () => {
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate(`/`);
        }

    }
    const handleKeywordChange = (e) => {
        e.preventDefault();
        
        setKeyword(e.target.value)

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
    <form onSubmit={handleSearchSubmit}>
        <Box sx={{ display: 'flex'}}>

        <SearchDiv>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={keyword}
              onChange={handleKeywordChange}
              inputRef={searchInputRef}
            //   onFocus={}
            //   onKeyDown={searchHandler}
            />
         
          </SearchDiv>
          <SearchButton
          onClick={handleSearchSubmit}
            >
               <SearchIconWrapper/>
            </SearchButton>
            </Box>
        </form>
  )
}

export default Search