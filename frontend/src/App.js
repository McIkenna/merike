import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';

function App() {
  return (
    <div>
      <Header/>
      <p>This is the Merike Store</p>
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
