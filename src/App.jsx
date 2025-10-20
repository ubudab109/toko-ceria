import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { 
  ACCENT_COLOR_CLASS,
  DARK_BG,
} from './constant/mock';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Hero from './components/Hero';
import Features from './components/Features';
import Header from './components/Header';
import Footer from './components/Footer';



/**
 * Main Application Component (Handles Routing)
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  // --- Cart Handlers ---
  const handleAddToCart = useCallback((product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    setNotificationMessage(`${product.name} ditambahkan ke keranjang!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, [cart]);

  const updateQuantity = useCallback((id, delta) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      ).filter(item => item.quantity > 0);
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    setNotificationMessage(`Item dikeluarkan dari keranjang.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  // --- Checkout Logic (WhatsApp) ---
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      setNotificationMessage("Keranjang Anda kosong. Silakan tambahkan item sebelum checkout.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    const adminPhoneNumber = '6285846501669'; // Mock Admin WhatsApp Number
    let message = `Halo Admin Toko Ceria, saya ingin memesan dari website:%0A%0A`;
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      message += `${item.quantity}x ${item.name} (@Rp${item.price.toLocaleString('id-ID')}) - Total: Rp${itemTotal.toLocaleString('id-ID')}%0A`;
    });

    message += `%0A*Total Nilai Pesanan:* Rp${total.toLocaleString('id-ID')}%0A%0A`;
    message += `Mohon konfirmasi detail pesanan akhir, biaya pengiriman, dan metode pembayaran. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${message}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');

    // Optionally clear cart after redirect
    // setCart([]);
    // setCurrentPage('home');
  }, [cart]);

  // --- Dynamic Content Rendering ---
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage handleAddToCart={handleAddToCart} />;
      case 'cart':
        return <CartPage
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          checkout={handleCheckout}
        />;
      case 'home':
      default:
        return (
          <>
            <Hero setPage={setCurrentPage} />
            <Features />
            <ProductsPage handleAddToCart={handleAddToCart} />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${DARK_BG} font-inter`}>
      {/* Notification Toast */}
      {showNotification && (
        <div className={`fixed top-30 right-4 z-50 p-4 bg-gray-900 border border-[#AA8844] text-white rounded-lg shadow-xl transition-opacity duration-300 opacity-100 animate-fadeInOut`}>
          <p className="flex items-center">
            <ShoppingCart size={20} className={`mr-2 ${ACCENT_COLOR_CLASS}`} />
            {notificationMessage}
          </p>
        </div>
      )}

      <Header cartCount={cartCount} setPage={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
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
