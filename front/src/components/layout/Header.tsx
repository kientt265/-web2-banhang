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
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        {auth.user?.role === 'admin' && (
          <>
            <Link to="/admin/products">Manage Products</Link>
            <Link to="/admin/categories">Manage Categories</Link>
            <Link to="/admin/orders">Manage Orders</Link>
          </>
        )}
        {auth.token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;