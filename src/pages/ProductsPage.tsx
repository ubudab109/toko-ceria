import React, { useMemo, useState } from "react";
import {
    CATEGORIES,
    DARK_BG,
    MOCK_PRODUCTS,
    TEXT_LIGHT,
    TEXT_MUTED,
} from "../constant/mock";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ handleAddToCart }) => {
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "Semua") {
            return MOCK_PRODUCTS;
        }
        return MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <section
            id="products"
            className={`${DARK_BG} py-16 md:py-24 min-h-screen`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    className={`text-4xl font-bold text-center ${TEXT_LIGHT} mb-12`}
                >
                    Koleksi Nusantara
                </h2>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            // FIX: Use literal hex code for active state background/border
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${
                                category === selectedCategory
                                    ? `bg-[#AA8844] text-black border-[#AA8844]`
                                    : `bg-transparent ${TEXT_MUTED} border-gray-700 hover:border-[#AA8844] hover:text-white`
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;
