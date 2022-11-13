import { Route, Routes } from 'react-router-dom';
import Header from './conponents/Header';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import OrderListPage from './pages/OrderListPage';
import OrderPage from './pages/OrderPage';
import SignUpPage from './pages/SignUpPage';
import StorePage from './pages/StorePage';

export default function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<StorePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Routes>
      </div>
    </div>
  );
}
