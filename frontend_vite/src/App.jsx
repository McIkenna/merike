// import './App.css'
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/layout/Home.jsx';
import { Container, Box } from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductDetail from './components/product/ProductDetail.jsx';
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';
import { Cart } from './components/cart/Cart.jsx';
import UserProfilePage from './components/user/UserProfilePage.jsx';
import Checkout from './components/checkout/Checkout.jsx';
import CheckoutSuccess from './components/checkout/CheckoutSuccess.jsx';
import { AdminDashboard } from './components/product/productAdmin/AdminDashboard.jsx';
import { SelectHome } from './components/layout/SelectHome.jsx';
import { AboutUs } from './components/profile/AboutUs.jsx';
import { TermsOfService } from './components/profile/TermsOfService.jsx';
import {FAQs} from './components/profile/FAQs.jsx';
import { ContactUs } from './components/profile/ContactUs.jsx';
import { PrivacyPolicy } from './components/profile/PrivatePolicy.jsx';
import { FavoritePage } from './utils/FavoritePage.jsx';
import Order from './components/order/Order';

function App() {

  return (
    <>
      <Router>
        <Box
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
        }}>
            <Header/>
            <Box sx={{ padding: '2%', }}>
            <Routes>
            <Route path='/' Component={Home} exact/>
            <Route path='/recommended' Component={SelectHome} exact/>
            <Route path='/cart-inspired' Component={SelectHome} exact/>
            <Route path='/recently-bought' Component={SelectHome} exact/>
            <Route path='/login' Component={Login} exact/>
            <Route path='/register' Component={Register} exact/>
            <Route path='/product/:id' Component={ProductDetail} exact/> 
            <Route path='/cart' Component={Cart} exact/>
            <Route path='/profile' Component={UserProfilePage} exact/>
            <Route path='/checkout' Component={Checkout} exact/>
            <Route path='/checkout-success' Component={CheckoutSuccess} exact/>
            <Route path='/dashboard' Component={AdminDashboard} exact />
            <Route path='/aboutUs' Component={AboutUs} exact />
            <Route path='/terms' Component={TermsOfService} exact />
            <Route path='/faqs' Component={FAQs} exact />
            <Route path='/contactus' Component={ContactUs} exact />
             <Route path='/privacyPolicy' Component={PrivacyPolicy} exact />
             <Route path='/favoritePage' Component={FavoritePage} exact />
             <Route path='/order' Component={Order} exact />
            </Routes>
            </Box>
            <Footer/>
        
          </Box>
          </Router>
    </>
  )
}

export default App
