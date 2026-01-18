import React, { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider, Drawer, List, ListItem } from '@mui/material';
// import {MenuIcon} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCart from '../../utils/ShoppingCart';
import merikeLogo from '../../static/images/Merike logo only color.png'
import merikeLogo2 from '../../static/images/Merkie_star.png'
import { useGetAllCategoryQuery } from '../../api/services/categoryApi';
import { useGetAllCarouselQuery } from '../../api/services/carouselApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../../utils/Search';
// import { useLogoutUserMutation } from '../../api/services/userApi';
import { useNavigate } from 'react-router-dom';
import { setCategories, setProducts, setSelectedCategory, setPriceFilter, setCarouselItems, setBannerItems } from '../../api/actions';
import { useGetAllProductsQuery } from '../../api/services/productApi';
import Banner from './Banner';
import { Category } from '../category/Category'
import { useGetAllBannerQuery } from '../../api/services/bannerApi';
import ThemeToggleButton from '../../utils/ThemeToggleButton.jsx';
import userAvatar from '../../static/images/user.png'
import { CustomSnackbar } from '../../utils/CustomSnackbar.jsx';
import { UseAuth } from '../../auth/AuthContext.jsx';


export default function Header() {
  // const pages = ['Products', 'Pricing', 'Blog'];
  const settings = {
    Profile: 'Profile',
    Dashboard: 'Dashboard',
    Order: 'My Order'
  };
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [category, setCategory] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useGetAllCategoryQuery();
  const { data: carouselData } = useGetAllCarouselQuery();
  const { data: prodData } = useGetAllProductsQuery();
  const { data: bannerData } = useGetAllBannerQuery();

  const [pageReloaded, setPageReloaded] = useState(false)
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const { isAuthenticated, logout } = UseAuth()
  // const auth = useSelector((state) => state.auth)
  const stateStore = useSelector((state) => state.stateStore)
  const { totalQuantity, selectedCategory, categories, bannerItems } = stateStore;

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setCategories(data))
    }
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


  const resetSnackMessage = () => {
    setTimeout(() => {
      setOpenSnackbar(false)
      setSnackbarMessage('')
      setSeverity('')
    }, [3000])
  }


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // useLogoutUserQuery()

    logout()
    setOpenSnackbar(true)
    setSnackbarMessage('You are logged out')
    setSeverity('info')
    resetSnackMessage()
    reloadPage()

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
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, padding: "5px", cursor: 'pointer' }}
              onClick={() => { reloadPage() }}>

              <img src={merikeLogo} style={{ width: '80px' }} />

            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, padding: "5px", cursor: 'pointer' }}
              onClick={() => { reloadPage() }}>

              <img src={merikeLogo2} style={{ width: '200px' }} />

            </Box>

            {/* <Box style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'primary.main',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => { reloadPage() }}
              >
                Merikemart
              </Typography>
            </Box> */}




            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px' }}>
              <Search pageReloaded={pageReloaded} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px', cursor: 'pointer' }}
              onClick={() => navigate('/cart')}>
              <ShoppingCart
                cartstyle={{ size: 2, color: 'text.primary', circleBg: "#EBEBE8" }}
                totalQuantity={totalQuantity}
              //style={{}} prop can be added
              />
            </Box>
            {
              isAuthenticated() ? (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, padding: '0 20px', textDecoration: 'none', cursor: 'pointer', flex: 0 }}
                  >
                    <Box sx={{display: { xs: 'none', md: 'flex' }}} onClick={handleLogout}>
                      <Typography textAlign="center" fontWeight={800}
                  sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.secondary'
                      }
                    }
                    }>Logout</Typography>

                    </Box>
                  
                </Box>
              ) : (
                <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' }, padding: '0 20px' }}>
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px', cursor: 'pointer' }}
                    onClick={() => navigate('/login')}>
                    <Typography textAlign="center" fontWeight={800} 
                    sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.secondary'
                      }
                    }
                    }>Login</Typography>
                  </Box>
                  <Box style={{ display: { xs: 'none', md: 'flex' }, padding: '0 20px', cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                  >
                    <Typography textAlign="center" fontWeight={800}
                    sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.secondary'
                      }
                    }
                    }>Register</Typography>
                  </Box>
                </Box>
              )
            }
            <CustomSnackbar
              openSnackbar={openSnackbar}
              snackbarMessage={snackbarMessage}
              setOpenSnackbar={setOpenSnackbar}
              severity={severity} />


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
                  <Link to={`/${key.toLowerCase()}`}

                    ><MenuItem 
                    key={key} 
                    onClick={() => { handleCloseUserMenu() }}
                    sx={{

                      '&:hover': {
                        bgcolor: 'background.dark'
                      }
                    }}
                  >
                    
                      <Typography textAlign="center"
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.white'
                      }

                      }}
                      >{page}</Typography>
                    
                  </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>


            <Box sx={{
              padding: '0 20px',
              display: { xs: 'none', md: 'flex' }
            }}>
              <ThemeToggleButton />
            </Box>

          </Toolbar>
        </Container>
        {/* <Divider /> */}
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
          {/* <Divider /> */}

          <List>
            {/* Search */}
            <ListItem sx={{ px: 2, py: 2 }}>
              <Search pageReloaded={pageReloaded} />
            </ListItem>

            {/* <Divider /> */}

            {/* Shopping Cart */}
            <ListItem sx={{ px: 2, py: 2 }} onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <ShoppingCart
                  cartstyle={{ size: 2, color: "#000", circleBg: "#EBEBE8" }}
                  totalQuantity={totalQuantity}
                />
                <Typography sx={{ ml: 2 }}>Cart</Typography>
              </Box>
            </ListItem>

            {/* <Divider /> */}

            {/* Auth buttons */}
            {isAuthenticated() ? (
              <ListItem sx={{ px: 2, py: 2, cursor: 'pointer', '&:hover': {
                        bgcolor: 'background.dark'
                      } }} onClick={handleLogout}>
                <Typography fontWeight={800}
                sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.secondary'
                      }
                    }
                    }>Logout</Typography>
              </ListItem>
            ) : (
              <>
                <ListItem sx={{ px: 2, py: 2, cursor: 'pointer', '&:hover': {
                        bgcolor: 'background.dark'
                      } }} onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                  <Typography fontWeight={800}
                  sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.white'
                      }
                    }
                    }>Login</Typography>
                </ListItem>
                <ListItem sx={{ px: 2, py: 2, cursor: 'pointer', '&:hover': {
                        bgcolor: 'background.dark'
                      } }} onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}>
                  <Typography fontWeight={800}
                  sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.white'
                      }
                    }
                    }>Register</Typography>
                </ListItem>
              </>
            )}

            {/* <Divider /> */}

            {/* Settings */}
            {Object.entries(settings).map(([key, page]) => (
              <ListItem 
              key={key} 
              sx={{ px: 2, py: 2, cursor: 'pointer', 

                      '&:hover': {
                        bgcolor: 'background.dark'
                      }
                     }} onClick={() => { navigate(`/${key.toLowerCase()}`); setMobileMenuOpen(false); }}>
                <Typography
                sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                        color: 'text.white'
                      }
                    }
                    }>{page}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Banner bannerItems={bannerItems} />
    </>
  )
}
