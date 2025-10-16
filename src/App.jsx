import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShoppingCart, Menu, X, ArrowRight, Star, Heart, Truck, Lock, Trash2, Home, List } from 'lucide-react';

// --- KONSTANTA & BRANDING ---
const PRIMARY_COLOR_ACCENT = '#AA8844'; // Emas/Perunggu Kusam
const ACCENT_COLOR_CLASS = 'text-[#AA8844]'; // Kelas literal untuk kustomisasi Tailwind
const DARK_BG = 'bg-[#121212]'; // Hitam Matte Gelap
const TEXT_LIGHT = 'text-gray-200';
const TEXT_MUTED = 'text-gray-400';
// Diperbarui: Menggunakan placeholder 40x40 untuk ukuran yang lebih besar
const LOGO_URL = "./logo/logo.png"; // Placeholder untuk Logo

// --- DATA MOCK ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Arak Nusantara Reserva",
    category: "Arak Premium",
    price: 380000,
    abv: "40%",
    volume: "750ml",
    description: "Distilasi murni dari beras Bali dan nira kelapa, diperam dalam tong kayu jati lokal. Halus, kompleks, dan berakar kuat dalam sejarah nusantara.",
    imageUrl: "./img/arak.png",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Brem Emas Manis",
    category: "Anggur Beras",
    price: 215000,
    abv: "15%",
    volume: "500ml",
    description: "Anggur beras manis tradisional Bali, berwarna keemasan dan difermentasi secara alami. Aroma madu, karamel, dan beras ketan manis. Sempurna sebagai hidangan penutup.",
    imageUrl: "./img/anggur_beras.png",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sopi Flores Palma Liar",
    category: "Spirit Palma Artisan",
    price: 495000,
    abv: "45%",
    volume: "700ml",
    description: "Spirit jernih dan kuat yang disuling tangan dari nira palma liar di Nusa Tenggara Timur. Berani, bersahaja, dan secara tradisional diminum langsung.",
    imageUrl: "./img/spirit_palma.png",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Intisari Tonik Herbal",
    category: "Minuman Lain",
    price: 95000,
    abv: "19%",
    volume: "620ml",
    description: "Anggur herbal fermentasi tradisional, dikenal dengan rasa manis dan aroma jamu. Klasik abadi yang populer di berbagai generasi.",
    imageUrl: "./img/others_drink.png",
    rating: 4.2,
  },
  {
    id: 5,
    name: "Batavia Arrack Punsch",
    category: "Arak Premium",
    price: 450000,
    abv: "48%",
    volume: "700ml",
    description: "Arrack berkadar alkohol tinggi dari tetes tebu Jawa, sempurna untuk koktail klasik seperti Swedish Punsch.",
    imageUrl: "./img/arak.png",
    rating: 4.7,
  }
];

const CATEGORIES = ["Semua", "Arak Premium", "Anggur Beras", "Spirit Palma Artisan", "Minuman Lain"];


// --- KOMPONEN UTILITAS ---

/**
 * StarRating Component
 */
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center space-x-0.5">
      {Array(fullStars).fill().map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
      {Array(emptyStars).fill().map((_, i) => (
        <Star key={`empty-${i}`} size={16} className={TEXT_MUTED} />
      ))}
      <span className={`ml-2 text-sm ${TEXT_MUTED}`}>{rating.toFixed(1)}</span>
    </div>
  );
};

/**
 * Logo Component (FIXED: Increased image size for better visibility)
 */
const Logo = ({ size = 'text-md', isButton = false, setPage }) => {
  // Menggunakan flex dan items-center untuk perataan sejajar
  // space-x-4 untuk jarak yang lebih baik
  const logoClasses = `flex items-center space-x-1 ${size} font-serif tracking-widest font-bold ${ACCENT_COLOR_CLASS}`;

  const logoContent = (
    <>
      <img
        src={LOGO_URL}
        alt="Logo Toko Ceria"
        width={100} // Diperbesar menjadi 40px
        height={100} // Diperbesar menjadi 40px
        // Menggunakan w-10 h-10 dan border-2 agar lebih menonjol
        className="rounded-full w-20 h-20 object-cover" 
      />
      <span>TOKO CERIA</span>
    </>
  );

  if (isButton) {
    return (
      <button
        onClick={() => setPage('home')}
        className={`hover:text-white transition duration-300 ${logoClasses}`}
      >
        {logoContent}
      </button>
    );
  }

  return (
    <span className={logoClasses}>
      {logoContent}
    </span>
  );
};

// --- KOMPONEN INTI ---

/**
 * Header Component with Navigation and Cart Status
 */
const Header = ({ cartCount, setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', page: 'home', icon: Home },
    { name: 'Toko', page: 'products', icon: List },
    { name: 'Keranjang', page: 'cart', icon: ShoppingCart },
  ];

  return (
    <header className={`${DARK_BG} sticky top-0 z-50 shadow-lg border-b border-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Logo isButton={true} setPage={setPage} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => { 
                setPage(item.page); 
                setIsOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className={`text-base font-medium transition duration-300 relative group
                ${currentPage === item.page ? 'text-white font-bold' : TEXT_MUTED + ' hover:text-white'}`}
            >
              {item.name}
              {item.page === 'cart' && cartCount > 0 && (
                <span className={`absolute -top-3 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/2 rounded-full bg-white`}>
                  {cartCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-md hover:bg-gray-800 transition duration-300 ${TEXT_LIGHT}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden ${DARK_BG} border-t border-gray-800`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { setPage(item.page); setIsOpen(false); }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-left
                  ${currentPage === item.page ? 'bg-gray-800 text-white' : `${TEXT_MUTED} hover:bg-gray-800 hover:text-white`}`}
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
                {item.page === 'cart' && cartCount > 0 && (
                   <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-black bg-white rounded-full">
                      {cartCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * Hero Section (Homepage)
 */
const Hero = ({ setPage }) => (
  <section className={`${DARK_BG} py-20 md:py-32 border-b border-gray-800`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight ${TEXT_LIGHT} leading-tight`}>
          Jiwa <span className={ACCENT_COLOR_CLASS}>Nusantara</span>
        </h1>
        <p className={`mt-4 text-lg md:text-xl ${TEXT_MUTED} max-w-lg mx-auto md:mx-0`}>
          Temukan spirit artisan terbaik Indonesia. Tradisi berabad-abad disempurnakan untuk selera modern.
        </p>
        <button
          onClick={() => setPage('products')}
          // FIX: Use literal hex code for background
          className={`mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-[#AA8844] hover:bg-opacity-80 transition duration-300 group`}
        >
          Jelajahi Koleksi Kami
          <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Mock Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="./img/premium.png"
          alt="Featured Premium Indonesian Spirit"
          // FIX: Use literal hex code for shadow color
          className="w-64 md:w-80 h-auto object-cover rounded-lg shadow-[0_0_50px_rgba(170,136,68,0.5)] transition duration-500 hover:scale-[1.03] grayscale hover:grayscale-0"
        />
      </div>
    </div>
  </section>
);

/**
 * Product Card Component
 */
const ProductCard = ({ product, handleAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${DARK_BG} rounded-xl shadow-xl overflow-hidden group transition duration-500 transform hover:scale-[1.01] border border-gray-800 hover:border-[#AA8844]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="h-72 flex items-center justify-center p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-contain transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/1C1C1C/FFF?text=Product+Image" }}
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <span className={`text-xs uppercase font-medium ${TEXT_MUTED}`}>{product.category}</span>
        <h3 className={`mt-1 text-xl font-semibold ${TEXT_LIGHT} truncate`}>{product.name}</h3>

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col">
            {/* <StarRating rating={product.rating} /> */}
            <p className={`text-2xl font-bold ${ACCENT_COLOR_CLASS} mt-1`}>
              Rp{(product.price).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(product)}
          // FIX: Use literal hex code for background
          className={`mt-4 w-full py-2 rounded-full text-black font-semibold bg-[#AA8844] hover:bg-opacity-90 transition duration-300 flex items-center justify-center`}
        >
          <ShoppingCart size={20} className="mr-2" />
          Tambahkan ke Keranjang
        </button>
      </div>
    </div>
  );
};

/**
 * Products Page Component
 */
const ProductsPage = ({ handleAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Semua") {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="products" className={`${DARK_BG} py-16 md:py-24 min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl font-bold text-center ${TEXT_LIGHT} mb-12`}>
          Koleksi Nusantara
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              // FIX: Use literal hex code for active state background/border
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${category === selectedCategory ? `bg-[#AA8844] text-black border-[#AA8844]` : `bg-transparent ${TEXT_MUTED} border-gray-700 hover:border-[#AA8844] hover:text-white`}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Cart Page Component
 */
const CartPage = ({ cart, updateQuantity, removeFromCart, checkout }) => {
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <section className={`${DARK_BG} py-24 md:py-32 min-h-screen text-center`}>
        <div className="max-w-3xl mx-auto px-4">
          <ShoppingCart size={64} className={`mx-auto ${ACCENT_COLOR_CLASS} mb-6`} />
          <h2 className={`text-3xl font-bold ${TEXT_LIGHT} mb-3`}>Keranjang Anda Kosong</h2>
          <p className={`${TEXT_MUTED} text-lg`}>Sepertinya Anda belum menambahkan spirit premium. Mulai jelajahi koleksi kami!</p>
          <button
            onClick={() => window.location.reload()} // Simple reload to navigate back to products on a single-page app mock
            // FIX: Use literal hex code for background
            className={`mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-[#AA8844] hover:bg-opacity-80 transition duration-300`}
          >
            Ke Toko
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${DARK_BG} py-16 md:py-24 min-h-screen`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl font-bold ${TEXT_LIGHT} mb-12 border-b border-gray-800 pb-4`}>
          Keranjang Belanja Anda ({cart.length} Item)
        </h2>

        {/* Cart Items List */}
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1C1C1C] rounded-lg shadow-xl border border-gray-800">
              <div className="flex items-center w-full sm:w-1/2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4 border border-gray-700"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/1C1C1C/FFF?text=IMG" }}
                />
                <div>
                  <h3 className={`font-semibold ${TEXT_LIGHT}`}>{item.name}</h3>
                  <p className={`text-sm ${TEXT_MUTED}`}>Rp{(item.price).toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-1/3 mt-3 sm:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className={`p-1 rounded-full border border-gray-700 ${TEXT_LIGHT} hover:bg-gray-700`}
                    disabled={item.quantity <= 1}
                  >
                    <X size={16} />
                  </button>
                  <span className={`w-6 text-center ${TEXT_LIGHT}`}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className={`p-1 rounded-full border border-gray-700 ${TEXT_LIGHT} hover:bg-gray-700`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>

                {/* Subtotal */}
                <p className={`font-semibold ${TEXT_LIGHT} hidden sm:block`}>
                  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-red-500 hover:text-red-400 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary & Checkout */}
        <div className="mt-10 p-6 bg-[#1C1C1C] rounded-lg shadow-2xl border border-[#AA8844]/50">
          <h3 className={`text-2xl font-bold ${TEXT_LIGHT} mb-4`}>Ringkasan Pesanan</h3>
          <div className="flex justify-between border-b border-gray-700 pb-3 mb-3">
            <span className={TEXT_MUTED}>Subtotal:</span>
            <span className={TEXT_LIGHT}>Rp{(cartTotal).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-xl font-bold ${TEXT_LIGHT}`}>Total:</span>
            <span className={`text-3xl font-extrabold ${ACCENT_COLOR_CLASS}`}>
              Rp{(cartTotal).toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={checkout}
            className="w-full py-4 text-lg font-bold text-black bg-green-500 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 17c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm-.018-4.002c-1.22 0-2.209-1.393-2.209-3.111C9.773 8.169 10.762 6.776 11.982 6.776s2.209 1.393 2.209 3.111c0 1.718-.989 3.111-2.209 3.111z" fill="currentColor"/><path d="M17.5 12c0 2.21-1.79 4-4 4h-3c-2.21 0-4-1.79-4-4s1.79-4 4-4h3c2.21 0 4 1.79 4 4zM12 8.5v3M12 15v.5" stroke="white" strokeWidth="1.5"/><path d="M8.5 10c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5v.5H8.5V10zM12 17c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5z" stroke="none" fill="currentColor"/><path d="M12 12a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1z" fill="currentColor" opacity="0.1"/></svg>
            Checkout via WhatsApp
          </button>
          <p className={`mt-3 text-center text-sm ${TEXT_MUTED}`}>
            Anda akan dialihkan ke WhatsApp dengan detail pesanan yang sudah terisi.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Features Section
 */
const Features = () => {
  const featuresData = [
    { icon: Truck, title: "Pengiriman Cepat", description: "Layanan nasional dengan kemasan aman dan terjamin." },
    { icon: Lock, title: "Pembayaran Aman", description: "Gateway pembayaran terenkripsi (berbasis WhatsApp)." },
    { icon: Star, title: "Kualitas Artisan", description: "Spirit pilihan dengan warisan budaya dan mutu terjamin." },
  ];

  return (
    <section className="bg-[#1C1C1C] py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {featuresData.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-4">
            <feature.icon size={36} className={`${ACCENT_COLOR_CLASS} mb-3`} />
            <h3 className={`text-xl font-semibold ${TEXT_LIGHT} mb-1`}>{feature.title}</h3>
            <p className={`text-sm ${TEXT_MUTED}`}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


/**
 * Footer Component
 */
const Footer = () => (
  <footer className={`${DARK_BG} border-t border-gray-800`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <div className="mb-4">
            {/* Logo in footer, not a button */}
            <Logo size="text-xl" /> 
          </div>
          <p className={`text-sm ${TEXT_MUTED}`}>
            Destinasi online utama untuk spirit dan minuman lokal terbaik Indonesia. Cicipi tradisi.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>Tautan Cepat</h4>
          <ul className="space-y-2">
            {['Semua Produk', 'Arak', 'Brem', 'Tentang Kami'].map(item => (
              <li key={item}>
                <a href="#" className={`text-sm ${TEXT_MUTED} hover:text-white transition duration-200`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>Layanan</h4>
          <ul className="space-y-2">
            {['FAQ', 'Pengiriman & Pengembalian', 'Kebijakan Privasi', 'Ketentuan Layanan'].map(item => (
              <li key={item}>
                <a href="#" className={`text-sm ${TEXT_MUTED} hover:text-white transition duration-200`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>Kontak</h4>
          <p className={`text-sm ${TEXT_MUTED}`}>Email: info@tokoceria.co.id</p>
          <p className={`text-sm ${TEXT_MUTED}`}>Telepon: +62 21 XXXX XXXX</p>
          <div className="mt-4 flex space-x-3">
            {/* Social Icons Placeholder */}
            <a href="#" className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}>FB</a>
            <a href="#" className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}>IG</a>
            <a href="#" className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}>TW</a>
          </div>
        </div>
      </div>

      <div className={`mt-10 pt-6 border-t border-gray-800 text-center ${TEXT_MUTED} text-sm`}>
        © {new Date().getFullYear()} Toko Ceria. Dibuat dengan spirit Indonesia.
      </div>
    </div>
  </footer>
);


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

    const adminPhoneNumber = '6285882759766'; // Mock Admin WhatsApp Number
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
