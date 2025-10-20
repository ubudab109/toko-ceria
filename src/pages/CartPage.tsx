import React, { useMemo } from "react";
import {
    ACCENT_COLOR_CLASS,
    DARK_BG,
    TEXT_LIGHT,
    TEXT_MUTED,
} from "../constant/mock";
import { ShoppingCart, Trash2, X } from "lucide-react";

const CartPage = ({ cart, updateQuantity, removeFromCart, checkout }) => {
    const cartTotal = useMemo(() => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }, [cart]);

    if (cart.length === 0) {
        return (
            <section
                className={`${DARK_BG} py-24 md:py-32 min-h-screen text-center`}
            >
                <div className="max-w-3xl mx-auto px-4">
                    <ShoppingCart
                        size={64}
                        className={`mx-auto ${ACCENT_COLOR_CLASS} mb-6`}
                    />
                    <h2 className={`text-3xl font-bold ${TEXT_LIGHT} mb-3`}>
                        Keranjang Anda Kosong
                    </h2>
                    <p className={`${TEXT_MUTED} text-lg`}>
                        Sepertinya Anda belum menambahkan spirit premium. Mulai
                        jelajahi koleksi kami!
                    </p>
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
                <h2
                    className={`text-4xl font-bold ${TEXT_LIGHT} mb-12 border-b border-gray-800 pb-4`}
                >
                    Keranjang Belanja Anda ({cart.length} Item)
                </h2>

                {/* Cart Items List */}
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1C1C1C] rounded-lg shadow-xl border border-gray-800"
                        >
                            <div className="flex items-center w-full sm:w-1/2">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4 border border-gray-700"
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://placehold.co/64x64/1C1C1C/FFF?text=IMG";
                                    }}
                                />
                                <div>
                                    <h3
                                        className={`font-semibold ${TEXT_LIGHT}`}
                                    >
                                        {item.name}
                                    </h3>
                                    <p className={`text-sm ${TEXT_MUTED}`}>
                                        Rp{item.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-1/3 mt-3 sm:mt-0">
                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                        className={`p-1 rounded-full border border-gray-700 ${TEXT_LIGHT} hover:bg-gray-700`}
                                        disabled={item.quantity <= 1}
                                    >
                                        <X size={16} />
                                    </button>
                                    <span
                                        className={`w-6 text-center ${TEXT_LIGHT}`}
                                    >
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                        className={`p-1 rounded-full border border-gray-700 ${TEXT_LIGHT} hover:bg-gray-700`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <p
                                    className={`font-semibold ${TEXT_LIGHT} hidden sm:block`}
                                >
                                    Rp
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString("id-ID")}
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
                    <h3 className={`text-2xl font-bold ${TEXT_LIGHT} mb-4`}>
                        Ringkasan Pesanan
                    </h3>
                    <div className="flex justify-between border-b border-gray-700 pb-3 mb-3">
                        <span className={TEXT_MUTED}>Subtotal:</span>
                        <span className={TEXT_LIGHT}>
                            Rp{cartTotal.toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <span className={`text-xl font-bold ${TEXT_LIGHT}`}>
                            Total:
                        </span>
                        <span
                            className={`text-3xl font-extrabold ${ACCENT_COLOR_CLASS}`}
                        >
                            Rp{cartTotal.toLocaleString("id-ID")}
                        </span>
                    </div>

                    <button
                        onClick={checkout}
                        className="w-full py-4 text-lg font-bold text-black bg-green-500 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-3"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 17c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm-.018-4.002c-1.22 0-2.209-1.393-2.209-3.111C9.773 8.169 10.762 6.776 11.982 6.776s2.209 1.393 2.209 3.111c0 1.718-.989 3.111-2.209 3.111z"
                                fill="currentColor"
                            />
                            <path
                                d="M17.5 12c0 2.21-1.79 4-4 4h-3c-2.21 0-4-1.79-4-4s1.79-4 4-4h3c2.21 0 4 1.79 4 4zM12 8.5v3M12 15v.5"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M8.5 10c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5v.5H8.5V10zM12 17c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5z"
                                stroke="none"
                                fill="currentColor"
                            />
                            <path
                                d="M12 12a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1z"
                                fill="currentColor"
                                opacity="0.1"
                            />
                        </svg>
                        Checkout via WhatsApp
                    </button>
                    <p className={`mt-3 text-center text-sm ${TEXT_MUTED}`}>
                        Anda akan dialihkan ke WhatsApp dengan detail pesanan
                        yang sudah terisi.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
