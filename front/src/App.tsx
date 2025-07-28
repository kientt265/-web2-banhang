import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Profile from './pages/public/Profile';
import ProductWithCategory from './pages/public/ProductWithCategory.tsx';
import CartList from './pages/public/CartList.tsx';
import OrderList from './pages/public/OrderList.tsx';
// import AdminUsers from './pages/admin/Users';
import AdminProducts from './pages/admin/Products';
// import AdminCategories from './pages/admin/Categories';
// import AdminOrders from './pages/admin/Orders';
import AdminLayout from './components/admin/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute.tsx';

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
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute 
          element={<AdminLayout />}
          role="admin"
        />
      }>
        <Route path="products" element={<AdminProducts />} />
        {/* <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} /> */}
      </Route>
    </Routes>
  )
}

export default App;
