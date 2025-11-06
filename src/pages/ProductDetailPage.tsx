// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you use React Router for dynamic product IDs
import {
    PRIMARY_COLOR_ACCENT,
    DARK_BG,
    TEXT_LIGHT,
    TEXT_MUTED,
    BROWN_DARK_BG,
    ACCENT_COLOR_CLASS
} from '../constant/mock'; // Adjust path to your constants file
import { ProductI } from '../interface/ProductInterface';
import toast from 'react-hot-toast';
import api from '../api';
import LoadingPopup from '../components/LoadingPopup';
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import { CartI } from '../interface/CartInterface';
import { useDispatch } from 'react-redux';
import { updateCart } from '../stores/cartSlice';

// Dummy icons (replace with actual icon library like lucide-react if desired)

const ProductDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>("");
    const [product, setProduct] = useState<ProductI>({
        id: 0,
        category: {
            id: 0,
            description: '',
            name: ''
        },
        category_id: 0,
        limited_stock: false,
        name: '',
        price: 0,
        slug: '',
        thumbnail: {
            image_url: '',
            is_thumbnail: false,
            product_id: 0,
            id: 0,
            is_deleted: false,
        }
    });
    const [mainImage, setMainImage] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState<ProductI[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDetailProduct = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/products/detail/${slug}`);
            console.log('res data', res.data)
            const { product, related_products } = res.data;
            setProduct(product);
            setRelatedProducts(related_products);
            setMainImage(product.thumbnail?.image_url || '');
        } catch (err: any) {
            console.log('err', err);
            if (err.status === 404) {
                navigate('product-not-found');
            } else {
                toast.error('Terjadi kesalahan. Mohon ulangi proses Anda');
                navigate('/');
            }
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getDetailProduct();
    }, [slug]);



    const handleQuantityChange = (type: string) => {
        if (product && product.stock !== undefined) {
            if (type === 'increase' && quantity < product.stock) {
                setQuantity(prev => prev + 1);
            } else if (type === 'decrease' && quantity > 1) {
                setQuantity(prev => prev - 1);
            }
        }
    };


    const addToCart = () => {
        if (!product) return;
        const cartItem: CartI = {
            ...product,
            quantity: quantity,
            totalPrice: product.price,
        };
        dispatch(updateCart(cartItem));
        setNotificationMessage(`${product.name} ditambahkan ke keranjang!`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    if (isLoading) {
        return (
            <LoadingPopup
                isVisible={isLoading}
            />
        )
    }


    return (
        <div className={`min-h-screen ${DARK_BG} ${TEXT_LIGHT} p-4 md:p-8 lg:p-12`}>
            {showNotification && (
                <div className={`fixed top-30 right-4 z-50 p-4 bg-gray-900 border border-[#AA8844] text-white rounded-lg shadow-xl transition-opacity duration-300 opacity-100 animate-fadeInOut`}>
                    <p className="flex items-center">
                        <ShoppingCart size={20} className={`mr-2 ${ACCENT_COLOR_CLASS}`} />
                        {notificationMessage}
                    </p>
                </div>
            )}
            <div className={`max-w-7xl mx-auto ${BROWN_DARK_BG} rounded-xl shadow-lg p-6 md:p-10`}>
                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="relative overflow-hidden rounded-lg shadow-xl mb-4" style={{ border: `2px solid ${PRIMARY_COLOR_ACCENT}` }}>
                            {
                                mainImage && (
                                    <img
                                        src={mainImage}
                                        alt={product.name}
                                        className="w-full h-auto object-cover max-h-[600px]"
                                    />
                                )
                            }
                        </div>
                        <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
                            {product.product_images?.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image_url}
                                    alt={product.name}
                                    className={`w-20 md:w-24 md:h-24 object-cover rounded-md cursor-pointer transition-transform duration-200 transform hover:scale-105
                    ${mainImage === img.image_url ? `border-2 border-[${PRIMARY_COLOR_ACCENT}]` : 'border-2 border-transparent'}`}
                                    onClick={() => setMainImage(img.image_url)}
                                // Prevent images from shrinking too much
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: PRIMARY_COLOR_ACCENT }}>
                            {product.name}
                        </h1>
                        <p className={`text-lg mb-4 ${TEXT_MUTED}`}>{product.category?.name || '-'}</p>

                        {/* <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} />
                                ))}
                            </div>
                            <span className={`ml-2 text-sm ${TEXT_MUTED}`}>(4.8 dari 5 Bintang)</span>
                        </div> */}

                        <p className="text-4xl font-bold mb-6 text-white">
                            Rp{product.price.toLocaleString("id-ID")}
                        </p>

                        <p className={`text-base mb-6 ${TEXT_LIGHT} leading-relaxed`}>
                            Deskripsi: {product.description}
                        </p>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                            <p className={`${TEXT_MUTED}`}>
                                <span className="font-semibold" style={{ color: PRIMARY_COLOR_ACCENT }}>Stok:</span>
                                <span className={`ml-2 ${(product.stock ?? 0) > 10 ? TEXT_LIGHT : 'text-orange-400'}`}>
                                    {(product.stock ?? 0) > 0 ? `${product.stock} Tersedia` : 'Habis'}
                                </span>
                            </p>
                            {product.origin && (
                                <p className={`${TEXT_MUTED}`}>
                                    <span className="font-semibold" style={{ color: PRIMARY_COLOR_ACCENT }}>Asal:</span>
                                    <span className={`ml-2 ${TEXT_LIGHT}`}>{product.origin}</span>
                                </p>
                            )}
                            {product.abv && (
                                <p className={`${TEXT_MUTED}`}>
                                    <span className="font-semibold" style={{ color: PRIMARY_COLOR_ACCENT }}>ABV:</span>
                                    <span className={`ml-2 ${TEXT_LIGHT}`}>{product.abv}</span>
                                </p>
                            )}
                            {product.volume && product.measurement && (
                                <p className={`${TEXT_MUTED}`}>
                                    <span className="font-semibold" style={{ color: PRIMARY_COLOR_ACCENT }}>Volume:</span>
                                    <span className={`ml-2 ${TEXT_LIGHT}`}>{product.volume} {product.measurement}</span>
                                </p>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center mb-6">
                            <span className={`font-semibold text-lg mr-4 ${TEXT_LIGHT}`}>Jumlah:</span>
                            <div className="flex items-center border border-gray-700 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange('decrease')}
                                    className={`px-4 py-2 text-xl font-bold rounded-l-lg hover:bg-gray-700 transition duration-200 ${TEXT_LIGHT}`}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className={`px-4 py-2 text-lg border-l border-r border-gray-700 ${TEXT_LIGHT}`}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange('increase')}
                                    className={`px-4 py-2 text-xl font-bold rounded-r-lg hover:bg-gray-700 transition duration-200 ${TEXT_LIGHT}`}
                                    disabled={quantity >= (product.stock || 0)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={addToCart}
                            className={`w-full md:w-1/2 py-2 bg-[#AA8844] hover:bg-[#C29E65] text-black rounded-md text-sm font-semibold transition duration-300 flex items-center justify-center`}
                            disabled={product.stock !== undefined ? product.stock === 0 : true}
                        >
                            <span className="mr-2">
                                <ShoppingCartIcon />
                            </span>
                            {product.stock !== undefined && product.stock > 0 ? "Tambahkan ke Keranjang" : "Stok Habis"}
                        </button>
                    </div>
                </div>

                {/* --- Related Products Section --- */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16 border-t border-gray-700 pt-12">
                        <h2 className={`text-3xl font-bold mb-8 text-center ${TEXT_LIGHT}`}>
                            Produk Terkait
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className={`bg-[#121212] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105`}
                                    onClick={() => navigate(`/products/${relatedProduct.slug}`)}
                                    style={{ border: `1px solid ${PRIMARY_COLOR_ACCENT}` }}
                                >
                                    <img
                                        src={relatedProduct.thumbnail.image_url}
                                        alt={relatedProduct.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className={`text-xl font-semibold mb-2 truncate ${TEXT_LIGHT}`} style={{ color: PRIMARY_COLOR_ACCENT }}>
                                            {relatedProduct.name}
                                        </h3>
                                        <p className={`text-lg font-bold mb-3 text-white`}>
                                            Rp{relatedProduct.price.toLocaleString("id-ID")}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/products/${relatedProduct.slug}`)}
                                            className={`w-full py-2 bg-[#AA8844] hover:bg-[#C29E65] text-black rounded-md text-sm font-semibold`}
                                        >
                                            Lihat Produk
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;