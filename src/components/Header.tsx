import { Home, List, Menu, ShoppingCart, X } from 'lucide-react';
import React, { useState } from 'react';
import { DARK_BG, TEXT_LIGHT, TEXT_MUTED } from '../constant/mock';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Toko", path: "/products", icon: List },
    { name: "Keranjang", path: "/carts", icon: ShoppingCart },
    { name: "Cari Pesanan", path: "/order-search", icon: ShoppingCart },
  ];

  return (
    <header className={`${DARK_BG} sticky top-0 z-50 shadow-lg border-b border-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <Logo isButton={true} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-base font-medium transition duration-300 relative group ${
                  isActive ? "text-white font-bold" : TEXT_MUTED + " hover:text-white"
                }`}
              >
                {item.name}
                {item.path === "/carts" && cartCount > 0 && (
                  <span className="absolute -top-3 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/2 rounded-full bg-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
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
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-left ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : `${TEXT_MUTED} hover:bg-gray-800 hover:text-white`
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                  {item.path === "/cart" && cartCount > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-black bg-white rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
