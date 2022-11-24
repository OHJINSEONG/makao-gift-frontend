import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Header from './conponents/Header';
import useUserStore from './hooks/useUserStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderListPage from './pages/OrderListPage';
import OrderPage from './pages/OrderPage';
import OrderProductPage from './pages/OrderInformationPage';
import ProductPage from './pages/ProductPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import StorePage from './pages/StorePage';
import { apiService } from './services/ApiService';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    if (accessToken) {
      userStore.fetchUser();
    }
  }, [accessToken]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signupSuccess" element={<SignUpSuccessPage />} />
          <Route path="/products" element={<StorePage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="orders/:orderId" element={<OrderProductPage />} />
        </Routes>
      </div>
    </div>
  );
}
