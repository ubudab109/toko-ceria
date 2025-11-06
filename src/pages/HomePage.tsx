import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductsPage from "./ProductsPage";
import { ProductI } from "../interface/ProductInterface";
import React from "react";

interface HomePageProps {
    products: ProductI[];
    categories: string[];
    handleAddToCart: (product: ProductI) => void;
    loading: boolean;
}

export default function HomePage({ products, categories, handleAddToCart, loading }: HomePageProps) {
    return (
        <>
            <Hero />
            <Features />
            <ProductsPage
                loading={loading}
                products={products}
                categories={categories}
                handleAddToCart={handleAddToCart}
            />
        </>
    );
}

