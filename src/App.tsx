import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Validator from './pages/Validator';
import Patterns from './pages/Patterns';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="validar" element={<Validator />} />
          <Route path="patrones" element={<Patterns />} />
          <Route path="acerca" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
