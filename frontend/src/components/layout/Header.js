import React, { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
// import {MenuIcon} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCart from '../../utils/ShoppingCart';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../utils/Themes';
import merikeLogo from '../../static/images/Merike logo only color.png'
import DropDownSelect from '../../utils/DropDownSelect';
import { useGetAllCategoryQuery } from '../../api/services/categoryApi';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../../utils/Search';
import { grey, green, red, blue } from "@mui/material/colors";
import { useLogoutUserQuery } from '../../api/services/userApi';
import { useNavigate } from 'react-router-dom';
import { setCategories, setProducts, setSelectedCategory, setPriceFilter } from '../../api/actions';
import { useGetAllProductsQuery } from '../../api/services/productApi';
import Banner from './Banner';


export default function Header() {
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [category, setCategory] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, error, isLoading, isSuccess, refetch: categoryRefetch } = useGetAllCategoryQuery();
  const { data: prodData, error: prodError, isLoading: prodIsLoading, isSuccess: prodIsSuccess, refetch: productRefetch } = useGetAllProductsQuery();
  const [ pageReloaded, setPageReloaded] = useState(false)
  // const {logoutUser, isError, isSuccess: logoutSuccess}= useLogoutUserQuery()
    useEffect(() => {
    if (data !== undefined) {
      dispatch(setCategories(data))
    }
  }, [data])

  useEffect(() => {
    if (prodData !== undefined) {
      dispatch(setProducts(prodData?.products))
    }
  }, [prodData])

  console.log('prodData', prodData)
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

  const logOut = () => {
    navigate('/')
  }

  const reloadPage = () => {
    // categoryRefetch()
    // productRefetch()
    dispatch(setSelectedCategory(''))
    dispatch(setPriceFilter([1, 150]))
    setPageReloaded(true)
    navigate('/')
  }
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, paddingRight: "10px",  }}
              onClick={() => {reloadPage()}}>
              
                  <img src={merikeLogo} style={{ width: '100px' }} />
                
              </Box>

              <Box style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: blue[800],
                    textDecoration: 'none',
                  }}
                  onClick={() => {reloadPage()}} 
                >
                  Merike
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => { handleOpenNavMenu(e) }}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                {/* <Menu
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
                  onClose={() => { handleCloseNavMenu() }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    page === 'Category' ? <DropDownSelect categories={categories} /> :
                      <MenuItem key={page} onClick={() => { handleCloseNavMenu() }}>
                        <Typography variant="display3" textAlign="center">{page}</Typography>
                      </MenuItem>
                  )
                  )}

                </Menu> */}
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, paddingRight: "10px" }}>
                <img src={merikeLogo} style={{ width: '100px' }} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
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
                    <Button
                      key={page}
                      onClick={() => { handleCloseNavMenu() }}
                      sx={{ my: 2, color: '#212121', display: 'block' }}
                    >
                      {page}
                    </Button>
                ))}
              </Box>

              <Search pageReloaded={pageReloaded}/>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <ShoppingCart
                  cartstyle={{ size: 2, color: "#000", circleBg: "#EBEBE8" }}
                //style={{}} prop can be added
                />
              </Box>
              <Box style={{ textDecoration: 'none', paddingRight: '20px'}}>
                <Link to={`/login`}style={{ textDecoration: 'none', color: grey[800]}}>
                  <Typography textAlign="center">Login</Typography>
                </Link>
              </Box>
              <Box style={{ textDecoration: 'none', paddingRight: '20px', cursor: 'pointer' }}
              onClick={useLogoutUserQuery()}
            >
                  <Typography textAlign="center">Logout</Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={(e) => { handleOpenUserMenu(e) }} sx={{ p: 0 }}>
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
                    <MenuItem key={setting} onClick={() => { handleCloseUserMenu() }}>
                      <Link to={`/${setting.toLowerCase()}`}>
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Banner />
      </ThemeProvider>
    </>
  )
}
