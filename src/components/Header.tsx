import { Home, List, Menu, ShoppingCart, X } from 'lucide-react';
import React, { useState } from 'react';
import { DARK_BG, TEXT_LIGHT, TEXT_MUTED } from '../constant/mock';
import Logo from './Logo';

const Header = ({ cartCount, setPage, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Beranda", page: "home", icon: Home },
        { name: "Toko", page: "products", icon: List },
        { name: "Keranjang", page: "cart", icon: ShoppingCart },
    ];

    return (
        <header
            className={`${DARK_BG} sticky top-0 z-50 shadow-lg border-b border-gray-800`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <div>
                    <Logo isButton={true} />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => {
                                setPage(item.page);
                                setIsOpen(false);
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                            className={`text-base font-medium transition duration-300 relative group
                  ${
                      currentPage === item.page
                          ? "text-white font-bold"
                          : TEXT_MUTED + " hover:text-white"
                  }`}
                        >
                            {item.name}
                            {item.page === "cart" && cartCount > 0 && (
                                <span
                                    className={`absolute -top-3 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/2 rounded-full bg-white`}
                                >
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
                <div
                    className={`md:hidden ${DARK_BG} border-t border-gray-800`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <button
                                key={item.page}
                                onClick={() => {
                                    setPage(item.page);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-left
                    ${
                        currentPage === item.page
                            ? "bg-gray-800 text-white"
                            : `${TEXT_MUTED} hover:bg-gray-800 hover:text-white`
                    }`}
                            >
                                <item.icon size={20} className="mr-3" />
                                {item.name}
                                {item.page === "cart" && cartCount > 0 && (
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

export default Header;
