import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import { CartContext } from './pages/CartContext';
import { useState } from 'react';

function App() {

    const [cartItems, setCartItems] = useState([])

    return (
        <BrowserRouter>

          <CartContext.Provider value={{cartItems,setCartItems}}>
            <div className='navbar'>
              <Link to="/">Home</Link>
              <Link to="/product_detail">Product</Link>
              <Link to="/checkout">CheckOut</Link>
            </div>

            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/product' element={<ProductDetails/>}>
                  <Route path=':id' element={<ProductDetails/>}/>
              </Route>
              <Route path='*' element={<Error/>}/>
            </Routes>
          </CartContext.Provider>
        </BrowserRouter>
    );
}

export default App;
