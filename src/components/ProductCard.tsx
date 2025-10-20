import React, { useState } from "react";
import { ACCENT_COLOR_CLASS, DARK_BG, TEXT_LIGHT, TEXT_MUTED } from "../constant/mock";
// Assuming you have these constants and the ShoppingCart icon imported
// const DARK_BG = "bg-[#121212]";
// const TEXT_LIGHT = "text-white";
// const TEXT_MUTED = "text-gray-400";
// const ACCENT_COLOR_CLASS = "text-[#AA8844]";
// import { ShoppingCart } from 'lucide-react'; // Example icon library

// --- ImageModal Component ---
const ImageModal = ({ imageUrl, altText, onClose }) => {
    return (
        // Modal overlay
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={onClose} // Close when clicking the overlay
        >
            {/* Modal content */}
            <div 
                className="relative max-w-4xl max-h-[90vh] bg-[#1C1C1C] rounded-xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/content area
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 text-white text-3xl font-bold bg-gray-800 rounded-full hover:bg-gray-700 transition"
                    aria-label="Close"
                >
                    &times;
                </button>
                
                {/* Image */}
                <img
                    src={imageUrl}
                    alt={altText}
                    className="max-h-[80vh] w-auto object-contain rounded-lg"
                />
            </div>
        </div>
    );
};
// ----------------------------

const ProductCard = ({ product, handleAddToCart }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

    // Function to open the modal
    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`relative ${DARK_BG} rounded-xl shadow-xl overflow-hidden group transition duration-500 transform hover:scale-[1.01] border border-gray-800 hover:border-[#AA8844]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Product Image */}
                <div 
                    className="h-72 flex items-center justify-center p-4 cursor-pointer"
                    onClick={handleImageClick} // Added click handler here
                >
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={`w-full h-full object-contain transition-transform duration-500 ${
                            isHovered ? "scale-105" : "scale-100"
                        }`}
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/400x500/1C1C1C/FFF?text=Product+Image";
                        }}
                    />
                </div>

                {/* Product Details (rest of your card content) */}
                <div className="p-5">
                    <span className={`text-xs uppercase font-medium ${TEXT_MUTED}`}>
                        {product.category}
                    </span>
                    <h3
                        className={`mt-1 text-md font-semibold ${TEXT_LIGHT} truncate`}
                    >
                        {product.name}
                    </h3>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col">
                            <p
                                className={`text-2xl font-bold ${ACCENT_COLOR_CLASS} mt-1`}
                            >
                                Rp{product.price.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleAddToCart(product)}
                        className={`mt-4 w-full py-2 rounded-full text-black font-semibold bg-[#AA8844] hover:bg-opacity-90 transition duration-300 flex items-center justify-center`}
                    >
                        {/* Assuming ShoppingCart is imported */}
                        {/* <ShoppingCart size={20} className="mr-2" /> */} 
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>

            {/* Image Modal - Conditionally rendered */}
            {isModalOpen && (
                <ImageModal
                    imageUrl={product.imageUrl}
                    altText={product.name}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ProductCard;
