import {useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import {useNavigate, useLocation} from 'react-router-dom'
import {Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';


  

  const SearchButton = styled(IconButton)(() => ({
    '&:hover': {
        color: 'background.main'
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
      const reset = () =>setSearch('')
      reset()
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