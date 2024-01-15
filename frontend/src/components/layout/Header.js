import React, {useState, useEffect} from 'react'
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
// import {MenuIcon} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ShoppingCart from '../../utils/ShoppingCart';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../utils/Themes';
import merikeLogo from '../../static/images/Merike logo only color.png'
import DropDownSelect from '../../utils/DropDownSelect';
import { useGetAllCategoryQuery } from '../../api/services/categoryApi';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.default, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.default, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.background.default
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

export default function Header() {
    const pages = ['Products', 'Pricing', 'Blog', 'Category'];
   const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [category, setCategory] = useState(null);
   useDispatch()
   const { data: categories, error, isLoading, isSuccess} = useGetAllCategoryQuery();

   useEffect(() =>{
    if(categories !== undefined){
        setCategory(categories)
    }
   }, [categories])

  const handleOpenNavMenu = (event) => {
    console.log('event', event)
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log('event', event)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <ThemeProvider theme={lightTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, paddingRight: "10px"}}>
            <img src={merikeLogo} style={{ width: '100px'}}/>
            </Box>
            
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            
          >
            Merike
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => {handleOpenNavMenu(e)}}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
           
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {handleCloseNavMenu()}}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                page === 'Category' ? <DropDownSelect categories={category}/> :
                <MenuItem key={page} onClick={() => {handleCloseNavMenu()}}>
                  <Typography variant="display3" textAlign="center">{page}</Typography>
                </MenuItem>
              )
              )}
             
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, paddingRight: "10px"}}>
            <img src={merikeLogo} style={{ width: '100px'}}/>
            </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Merike
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                page === 'Category'? <DropDownSelect categories={category}/>:
              <Button
                key={page}
                onClick={() => {handleCloseNavMenu()}}
                sx={{ my: 2, color: '#212121', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <ShoppingCart
          cartstyle={{ size: 2, color: "#000", circleBg: "#EBEBE8" }}
          //style={{}} prop can be added
        />
</Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => {handleOpenUserMenu(e)}} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                handleCloseUserMenu()
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {handleCloseUserMenu()}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    </>
  )
}
