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
function App() {
  return (
    <Router>
  <div>
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
      </Routes>
      </Box>
      <Footer/>
  
    </div>
    </Router>
  
  );
}

export default App;
