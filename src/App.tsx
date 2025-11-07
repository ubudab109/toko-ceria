import React, { useState, useCallback, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  ACCENT_COLOR_CLASS,
  DARK_BG,
} from './constant/mock';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { CartI } from './interface/CartInterface';
import { RootState } from './stores';
import { deleteProductFromCart, updateCart } from './stores/cartSlice';
import { ProductI } from './interface/ProductInterface';
import toast from 'react-hot-toast';
import api from './api';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingPopup from './components/LoadingPopup';
import OrderDetailPage from './pages/OrderDetail';
import OrderNotFoundPage from './pages/OrderNotFoundPage';
import OrderSearchPage from './pages/OrderSearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ScrollToTop from './components/ScrollToTop';
import AgeVerificationModal from './components/AgeVerificationModal';

/**
 * Main Application Component (Handles Routing)
 */
export default function App() {
  const carts: CartI[] = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [products, setProducts] = useState<ProductI[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAgeConfirmation, setShowAgeConfirmation] = useState<boolean>(false);

  // --- AGE CONFIRMATION HANDLER ---
  const handleAgeConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      // Set localStorage to prevent modal from showing again
      localStorage.setItem('ageConfirmed', 'true');
      setShowNotification(true);
      setNotificationMessage("Terimakasih atas konfirmasi Anda. Silahkan menjelajahi produk kami");
      setTimeout(() => {
        setShowNotification(false)
      },2000);
    } else {
      // Optional: If they refuse, you could redirect them or show a persistent message.
      // For now, we simply close the modal and they can continue, but this is the place 
      // to implement stricter age gates if needed.
      setNotificationMessage("Anda mungkin tidak dapat mengakses semua konten.");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false)
        window.location.replace("https://www.google.com"); 
      },
      2000);
    }
    // Always hide the modal after user interaction
    setShowAgeConfirmation(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check Local Storage for age confirmation status
    const isAgeConfirmed = localStorage.getItem('ageConfirmed');
    if (isAgeConfirmed !== 'true') {
      setShowAgeConfirmation(true);
    }
  }, []);


  // --- Cart Handlers ---
  const handleAddToCart = (product: ProductI) => {
    if (!product) return;
    const cartItem: CartI = {
      ...product,
      quantity: 1,
      totalPrice: product.price,
    };
    dispatch(updateCart(cartItem));
    setNotificationMessage(`${product.name} ditambahkan ke keranjang!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const updateQuantity = useCallback(
    (id: number, delta: number) => {
      const product = carts?.find((item) => item.id === id);
      if (!product) return;

      const newQuantity = product.quantity + delta;
      console.log('delta:', delta, '=> newQuantity:', newQuantity);

      if (newQuantity <= 0) {
        dispatch(deleteProductFromCart({ productId: id }));
      } else {
        const updatedProduct: CartI = {
          ...product,
          quantity: newQuantity,
          totalPrice: product.price * newQuantity,
        };
        dispatch(updateCart(updatedProduct));
      }
    },
    [carts, dispatch]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      dispatch(deleteProductFromCart({ productId: id }));
      setNotificationMessage(`Item dikeluarkan dari keranjang.`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    },
    [dispatch]
  );

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products/all');
      const { products, categories } = res.data;
      const allCategories = categories;
      setProducts(products || []);
      setCategories(allCategories);
    } catch (err: any) {
      console.error('err', err);
      toast.error('Harap periksa koneksi Anda');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <LoadingPopup
        isVisible={loading}
      />
    )
  }
  return (
    <div className={`min-h-screen ${DARK_BG} font-inter`}>
      <AgeVerificationModal
        isVisible={showAgeConfirmation}
        onClose={handleAgeConfirmation}
      />
      {/* Notification Toast */}
      {showNotification && (
        <div className={`fixed top-30 right-4 z-50 p-4 bg-gray-900 border border-[#AA8844] text-white rounded-lg shadow-xl transition-opacity duration-300 opacity-100 animate-fadeInOut`}>
          <p className="flex items-center">
            <ShoppingCart size={20} className={`mr-2 ${ACCENT_COLOR_CLASS}`} />
            {notificationMessage}
          </p>
        </div>
      )}

      <Header cartCount={carts.length} />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage categories={categories} handleAddToCart={handleAddToCart} loading={loading} products={products} />} />

          <Route path='/products' element={<ProductsPage categories={categories} handleAddToCart={handleAddToCart} loading={loading} products={products} />} />

          <Route path='/products/:slug' element={<ProductDetailPage />} />

          <Route path='/carts' element={<CartPage carts={carts} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />

          <Route path='/order' element={<OrderDetailPage />} />
          <Route path='/order-search' element={<OrderSearchPage />} />
          <Route path='/order-not-found' element={<OrderNotFoundPage />} />
        </Routes>
      </main>
      <Footer />

      {/* Tailwind Fade In/Out Animation Utility (Required for the toast) */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
