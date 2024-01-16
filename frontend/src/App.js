import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import { Container } from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductDetail from './components/layout/ProductDetail';
function App() {
  return (
    <Router>
  <div>
      <Header/>
      <Container sx={{ paddingTop: '100px'}}>
      <Routes>
      <Route path='/' Component={Home} exact/>
      <Route path='/product/:id' Component={ProductDetail} exact/>       
      </Routes>
      </Container>
      <Footer/>
  
    </div>
    </Router>
  
  );
}

export default App;
