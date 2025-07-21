import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/public/Home';
function App() {


  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
