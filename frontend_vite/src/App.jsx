// import './App.css'
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/layout/Home.jsx';
import { Container, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute.jsx';
import { PublicRoute } from './auth/PublicRoute.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
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
import { FAQs } from './components/profile/FAQs.jsx';
import { ContactUs } from './components/profile/ContactUs.jsx';
import { PrivacyPolicy } from './components/profile/PrivatePolicy.jsx';
import { FavoritePage } from './utils/FavoritePage.jsx';
import NotFoundPage from './utils/NotFoundPage.jsx';
import Order from './components/order/Order';
// import ModernLoader from './utils/ModernLoader.jsx';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Box
            sx={{
              backgroundColor: 'background.default',
              color: 'text.primary',
              minHeight: '100vh',
            }}>

            <Header />
            <Box sx={{ padding: '2%', }}>

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/recommended' element={<SelectHome />} />
                <Route path='/cart-inspired' element={<SelectHome />} />
                <Route path='/recently-bought' element={<SelectHome />} />
                <Route path='/login' element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path='/register' element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile' element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                } />
                <Route path='/checkout' element={
                  <ProtectedRoute>
                    <Checkout />

                  </ProtectedRoute>} />
                <Route path='/checkout-success' element={
                  <ProtectedRoute>
                    <CheckoutSuccess />
                  </ProtectedRoute>} />
                <Route path='/dashboard' element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/terms' element={<TermsOfService />} />
                <Route path='/faqs' element={<FAQs />} />
                <Route path='/contactus' element={<ContactUs />} />
                <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
                <Route path='/favoritePage' element={
                  <FavoritePage />
                } />
                <Route path='/order' element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>} />

                   <Route path="*" element={<NotFoundPage />} />
              </Routes>
             
                        

            </Box>
            <Footer />

          </Box>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
