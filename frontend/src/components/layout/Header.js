import React, { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider, Drawer, List, ListItem } from '@mui/material';
// import {MenuIcon} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCart from '../../utils/ShoppingCart';
import merikeLogo from '../../static/images/Merike logo only color.png'
import { useGetAllCategoryQuery } from '../../api/services/categoryApi';
import { useGetAllCarouselQuery } from '../../api/services/carouselApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../../utils/Search';
import { grey, blue } from "@mui/material/colors";
import { useLogoutUserMutation } from '../../api/services/userApi';
import { useNavigate } from 'react-router-dom';
import { setCategories, setProducts, setSelectedCategory, setPriceFilter, setProductRecentlyBought, setAllOrders, setCarouselItems, setBannerItems } from '../../api/actions';
import { useGetAllProductsQuery } from '../../api/services/productApi';
import Banner from './Banner';
import { setUser, setToken } from '../../api/actions';
// import { useMyOrdersQuery } from '../../api/services/orderApi';
import { Category } from '../category/Category'
import { useGetAllBannerQuery } from '../../api/services/bannerApi';
import ThemeToggleButton from '../../utils/ThemeToggleButton';
import userAvatar from '../../static/images/user.png'


export default function Header() {
  // const pages = ['Products', 'Pricing', 'Blog'];
  const settings = {
    Profile: 'Profile', 
    Dashboard: 'Dashboard', 
    Order: 'My Order'};
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [category, setCategory] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, error, isLoading, isSuccess, refetch: categoryRefetch } = useGetAllCategoryQuery();
  const { data: carouselData, error: carouselError, isLoading: carouselIsLoading, isSuccess: isSuccessCarousel } = useGetAllCarouselQuery();
  const { data: prodData, error: prodError, isLoading: prodIsLoading, isSuccess: prodIsSuccess, refetch: productRefetch } = useGetAllProductsQuery();
  const { data: bannerData, error: bannerError, isLoading: bannerIsLoading, isSuccess: bannerIsSuccess } = useGetAllBannerQuery();

  const [pageReloaded, setPageReloaded] = useState(false)
  const [logoutUser, { isError, isSuccess: logoutSuccess, ...props }] = useLogoutUserMutation()
  const { stateStore, auth } = useSelector((state) => state)
  const { user } = auth
  // console.log('auth', auth)
  // const { data: orderData, isSuccess: orderIsSuccess, isError: orderIsError } = useMyOrdersQuery()
  const { totalQuantity, selectedCategory, categories } = stateStore
  useEffect(() => {
    if (data !== undefined) {
      dispatch(setCategories(data))
    }
    // if (user?._id && orderIsSuccess) {
    //   dispatch(setAllOrders(orderData?.orders))
    // }
    if (carouselData !== undefined) {
      dispatch(setCarouselItems(carouselData?.carousels))
    }
    if (bannerData !== undefined) {
      dispatch(setBannerItems(bannerData?.adverts))
    }
  }, [data, carouselData, bannerData])

  useEffect(() => {
    if (prodData !== undefined) {
      dispatch(setProducts(prodData?.products))
    }
  }, [prodData])

  // console.log('logoutSuccess', logoutSuccess)
  // console.log('isError', isError)
  // console.log('props', props)
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logOut = () => {
    // useLogoutUserQuery()
    logoutUser()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(setUser(null))
    dispatch(setToken(null))
    setMobileMenuOpen(false);
    navigate('/')
  }

  const reloadPage = () => {
    // categoryRefetch()
    // productRefetch()
    dispatch(setSelectedCategory(''))
    dispatch(setPriceFilter([1, 150]))
    setPageReloaded(true)
    setMobileMenuOpen(false);
    navigate('/')
  }

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
    // keyparam.delete('search');

    // dispatch(filterProductByCategory(category))
  }
  return (
    <>
      <AppBar position="static" sx={{
        bgcolor: 'background.default'
      }}>
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0, padding: '0 10px' }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={toggleMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, paddingRight: "10px", cursor: 'pointer'}}
              onClick={() => { reloadPage() }}>

              <img src={merikeLogo} style={{ width: '100px' }} />

            </Box>

            <Box style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: blue[800],
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => { reloadPage() }}
              >
                Merikemart
              </Typography>
            </Box>

            


            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px' }}>
                <Search pageReloaded={pageReloaded} />
              </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px',cursor: 'pointer' }}
              onClick={() => navigate('/cart')}>
              <ShoppingCart
                cartstyle={{ size: 2, color: 'text.primary', circleBg: "#EBEBE8" }}
                totalQuantity={totalQuantity}
              //style={{}} prop can be added
              />
            </Box>
            {
              user?._id ? (
                <Box sx={{ padding: '0 20px', textDecoration: 'none', cursor: 'pointer', flex: 0 }}
                  onClick={() => logOut()}>
                  <Typography textAlign="center" fontWeight={800}>Logout</Typography>
                </Box>
              ) : (
                <Box style={{ display: 'flex', padding: '0 20px' }}>
                  <Box style={{ textDecoration: 'none', paddingRight: '20px', cursor: 'pointer', color: 'text.primary' }}
                  onClick={() => navigate('/login')}>
                      <Typography textAlign="center" fontWeight={800} >Login</Typography>
                  </Box>
                  <Box style={{ textDecoration: 'none', paddingRight: '20px', cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                  >
                    <Typography textAlign="center" fontWeight={800}>Register</Typography>
                  </Box>
                </Box>
              )
            }


            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' }, padding: '0 20px' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => { handleOpenUserMenu(e) }} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userAvatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', }}
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
                {Object.entries(settings).map(([key, page]) => (
                  <MenuItem key={key} onClick={() => { handleCloseUserMenu() }}
                    sx={{

                      '&:hover': {
                        bgcolor: 'background.dark'
                      }
                    }}
                  >
                    <Link to={`/${key.toLowerCase()}`}

                    >
                      <Typography textAlign="center"
                        sx={{
                          color: 'text.primary',

                        }}
                      >{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>


            <Box sx={{
              padding: '0 20px',
              display: {xs: 'none', md: 'flex'}
            }}>
              <ThemeToggleButton />
            </Box>

          </Toolbar>
        </Container>
        <Divider />
        <Box sx={{ padding: '5px 0', backgroundColor: 'background.paper', overflowX: 'auto', width: '100%' }}>
          <Category categories={categories} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
        </Box>

      </AppBar>

       {/* Mobile Drawer Menu */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box
            sx={{ width: 280, pt: 2 }}
            role="presentation"
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Menu</Typography>
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            
            <List>
              {/* Search */}
              <ListItem sx={{ px: 2, py: 2 }}>
                <Search pageReloaded={pageReloaded} />
              </ListItem>
              
              <Divider />
              
              {/* Shopping Cart */}
              <ListItem  sx={{ px: 2, py: 2 }} onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ShoppingCart
                    cartstyle={{ size: 2, color: "#000", circleBg: "#EBEBE8" }}
                    totalQuantity={totalQuantity}
                  />
                  <Typography sx={{ ml: 2 }}>Cart</Typography>
                </Box>
              </ListItem>
              
              <Divider />
              
              {/* Auth buttons */}
              {user?._id ? (
                <ListItem  sx={{ px: 2, py: 2, cursor: 'pointer' }} onClick={logOut}>
                  <Typography fontWeight={800}>Logout</Typography>
                </ListItem>
              ) : (
                <>
                  <ListItem  sx={{ px: 2, py: 2, cursor: 'pointer'}} onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                    <Typography fontWeight={800}>Login</Typography>
                  </ListItem>
                  <ListItem  sx={{ px: 2, py: 2, cursor: 'pointer' }} onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}>
                    <Typography fontWeight={800}>Register</Typography>
                  </ListItem>
                </>
              )}
              
              <Divider />
              
              {/* Settings */}
              {Object.entries(settings).map(([key, page]) => (
                <ListItem  key={key} sx={{ px: 2, py: 2 }} onClick={() => { navigate(`/${key.toLowerCase()}`); setMobileMenuOpen(false); }}>
                  <Typography>{page}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      <Banner />
    </>
  )
}
