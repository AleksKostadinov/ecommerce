import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <>
      <Header />
        <main className='py-3'>
            <Container>
                <Routes>
                    <Route path='/' element={< HomeScreen />} exact />
                    <Route path='/product/:id' element={< ProductScreen />} />
                    <Route path='/cart/:id?' element={< CartScreen />} />
                </Routes>
            </Container>
        </main>
      <Footer />
    </>
  );
}

export default App;
