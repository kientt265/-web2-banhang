import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
function App() {


  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
      </Route>
    </Routes>
  )
}

export default App
