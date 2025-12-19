import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import { Container, Box } from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductDetail from './components/product/ProductDetail';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { Cart } from './components/cart/Cart';
import UserProfilePage from './components/user/UserProfilePage';
import Checkout from './components/checkout/Checkout';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';
import { AdminDashboard } from './components/product/productAdmin/AdminDashboard';
import { SelectHome } from './components/layout/SelectHome';
import { AboutUs } from './components/profile/AboutUs';
import { TermsOfService } from './components/profile/TermsOfService';
import {FAQs} from './components/profile/FAQs';
import { ContactUs } from './components/profile/ContactUs';
import { PrivacyPolicy } from './components/profile/PrivatePolicy';
import { FavoritePage } from './utils/FavoritePage';
import Order from './components/order/Order';
function App() {
  return (
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
  
  );
}

export default App;
