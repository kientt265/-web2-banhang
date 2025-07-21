import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';

function Header() {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-lg font-semibold text-blue-600 hover:text-blue-800" to="/">Home</Link>
          <Link className="text-lg font-semibold text-gray-600 hover:text-gray-800" to="/cart">Cart</Link>
          <Link className="text-lg font-semibold text-gray-600 hover:text-gray-800" to="/wishlist">Wishlist</Link>
          <Link className="text-lg font-semibold text-gray-600 hover:text-gray-800" to="/orders">Orders</Link>
  
          {auth.user?.role === 'admin' && (
            <>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/products">Manage Products</Link>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/categories">Manage Categories</Link>
              <Link className="text-lg font-semibold text-red-600 hover:text-red-800" to="/admin/orders">Manage Orders</Link>
            </>
          )}
        </div>
  
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

        <div>
        <Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              to="/Signup"
            >
              Sign Up
            </Link>
        </div>
        </div>
      </nav>
    </header>
  );
  
}

export default Header;