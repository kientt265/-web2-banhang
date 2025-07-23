import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';
import cart_icon from '../../assets/cart_icon.png';
import search_icon from '../../assets/search_icon.png';
import user_icon from '../../assets/user_icon.png';
import { useState } from 'react';
import CagetoriesHeader  from '../cagetory/CagetoriesHeader';
import { categoryService } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import type { Category } from '../../types';
function Header() {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const {data: categories, isLoading} = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  })
  const handleLogout = () => {
    setAuth({ token: null, user: null });
    navigate('/login');
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-lg font-semibold text-blue-600 hover:text-blue-800" to="/">Home</Link>
          <CagetoriesHeader  categories={categories || []}/>
          <Link className="text-lg font-semibold text-blue-600 hover:text-blue-800" to={'/'}>Cửa hàng</Link>
          {/* <Link className="text-lg font-semibold text-gray-600 hover:text-gray-800" to="/wishlist">Wishlist</Link>
          <Link className="text-lg font-semibold text-gray-600 hover:text-gray-800" to="/orders">Orders</Link> */}
          
          {auth.user?.role === 'admin' && (
            <>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/products">Manage Products</Link>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/categories">Manage Categories</Link>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/orders">Manage Orders</Link>
            </>
          )}
        </div>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit">
            <img src={search_icon} alt="Search" className="w-5 h-5 hover:opacity-80" />
          </button>
        </form>

        <div className="flex items-center space-x-4">
        <div>
          {auth.token ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
        {auth.token ? (
          <div className='flex gap-2'>
            <Link to="/Profile">
              <img src={user_icon} alt="Cart" className="w-6 h-6 hover:opacity-80" />
            </Link>
            <Link to="/Cart">
            <img src={cart_icon} alt="Cart" className="w-6 h-6 hover:opacity-80" />
            </Link>
            <Link className='bg-blue-600 rounded p-2' to="/Order">My Orders</Link>
          </div>
        ) : (<Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              to="/Signup"
            >
              Sign Up
            </Link>)
}
        </div>
      </nav>
    </header>
  );
  
}

export default Header;