import React, { useState } from "react";
import {
    ACCENT_COLOR_CLASS,
    DARK_BG,
    TEXT_LIGHT,
    TEXT_MUTED,
} from "../constant/mock";
import { ProductI } from "../interface/ProductInterface";
import { useNavigate } from "react-router-dom";

interface ProductPageProps {
    product: ProductI;
    handleAddToCart: (product: ProductI) => void;
}

const ProductCard = ({ product, handleAddToCart }: ProductPageProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`cursor-pointer relative ${DARK_BG} rounded-xl shadow-xl overflow-hidden group transition duration-500 transform hover:scale-[1.01] border border-gray-800 hover:border-[#AA8844]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(`/products/${product.slug}`)}
            >
                {/* Product Image */}
                <div
                    className="h-72 flex items-center justify-center p-4 cursor-pointer"
                >
                    <img
                        src={product.thumbnail.image_url || 'https://placehold.co/400x500/1C1C1C/FFF?text=Product+Image'}
                        alt={product.name}
                        className={`w-full h-full object-contain transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"
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
                    <span
                        className={`text-xs uppercase font-medium ${TEXT_MUTED}`}
                    >
                        {product.category?.name || 'Non-Category'}
                    </span>
                    <h3
                        className={`mt-1 text-md font-semibold ${TEXT_LIGHT} truncate`}
                    >

                        {product.name}
                    </h3>
                    {product.limited_stock ? (
                        <span className="text-gray-400 text-sm" style={{ fontStyle: 'italic' }}>
                            *Stok Terbatas
                        </span>
                    ) : null}
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col">
                            <p
                                className={`text-2xl font-bold ${ACCENT_COLOR_CLASS} mt-1`}
                            >
                                Rp{product.price.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    {product.stock && product.stock < 1 ? (
                        <div className="text-white text-md">Stok Habis</div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                            className={`mt-4 w-full py-2 rounded-full text-black font-semibold bg-[#AA8844] hover:bg-opacity-90 transition duration-300 flex items-center justify-center`}
                        >
                            Tambahkan ke Keranjang
                        </button>
                    )}
                </div>
            </div>

        </>
    );
};

export default ProductCard;
