import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Profile from './pages/public/Profile';
import ProductWithCategory from './pages/public/ProductWithCategory.tsx';
import CartList from './pages/public/CartList.tsx';
import OrderList from './pages/public/OrderList.tsx';

function App() {


  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Category/:id" element={<ProductWithCategory />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Cart" element={<CartList/>}/>
        <Route path='/Order' element={<OrderList/>}/>
      </Route>
    </Routes>
  )
}

export default App
