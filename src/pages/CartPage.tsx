import React, {useEffect, useMemo, useState } from "react";
import {
    ACCENT_COLOR_CLASS,
    DARK_BG,
    TEXT_LIGHT,
    TEXT_MUTED,
} from "../constant/mock";
import { Minus, ShoppingCart, Trash2, X } from "lucide-react";
import { CartI } from "../interface/CartInterface";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { CustomerFormDataI } from "../interface/CustomerInterface";
import { useDispatch} from "react-redux";
import LoadingPopup from "../components/LoadingPopup";
import toast from "react-hot-toast";
import api from "../api";
import { clearCart } from "../stores/cartSlice";

interface CartPageProps {
    carts: CartI[];
    updateQuantity: (id: number, delta: number) => void;
    removeFromCart: (id: number) => void;
}

const CartPage = ({ carts, updateQuantity, removeFromCart }: CartPageProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingPopup, setLoadingPopup] = useState<boolean>(false);
    const cartTotal = useMemo(() => {
        return carts.reduce(
            (total: number, item: CartI) => total + item.price * item.quantity,
            0
        );
    }, [carts]);
    const [tempValues, setTempValues] = useState<Record<number, string>>(
        () => Object.fromEntries(carts.map(item => [item.id, item.quantity.toString()]))
    );

    useEffect(() => {
        setTempValues((prev) => {
            const updated = { ...prev };
            carts.forEach(item => {
                if (!updated[item.id] || updated[item.id] !== item.quantity.toString()) {
                    updated[item.id] = item.quantity.toString();
                }
            });

            Object.keys(updated).forEach(id => {
                if (!carts.find(c => c.id === Number(id))) {
                    delete updated[Number(id)];
                }
            });

            return updated;
        });
    }, [carts]);


    const onSubmit = async (data: CustomerFormDataI) => {
        setLoadingPopup(true);
        try {
            let payload = {
                ...data,
                carts: carts.map((cart: CartI) => {
                    return {
                        product_id: cart.id,
                        quantity: cart.quantity
                    }
                })
            };
            console.log('payload', carts);
            const res = await api.post('/checkout-order', payload);
            const { order_number } = res.data.data;
            navigate(`/order?orderNumber=${order_number}`);
            dispatch(clearCart());
        } catch (err: any) {
            console.log('err', err);
            const { message, status } = err.response.data;
            if (err.status == 422) {
                if (status === 'out_of_stock') {
                    toast.error(message)
                } else {
                    toast.error('Harap periksa semua input Anda');
                }
            } else {
                toast.error('Terjadi kesalahan mohon ulangin proses Anda');
            }
        } finally {
            setLoadingPopup(false);
        }
    }
    return (
        <section className={`${DARK_BG} py-16 md:py-24 min-h-screen`}>
            {
                carts.length === 0 ? (
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <ShoppingCart
                            size={64}
                            className={`mx-auto ${ACCENT_COLOR_CLASS} mb-6`}
                        />
                        <h2 className={`text-3xl font-bold ${TEXT_LIGHT} mb-3`}>
                            Keranjang Anda Kosong
                        </h2>
                        <p className={`${TEXT_MUTED} text-lg text=`}>
                            Sepertinya Anda belum menambahkan spirit premium. Mulai jelajahi
                            koleksi kami!
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className={`mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-[#AA8844] hover:bg-opacity-80 transition duration-300`}
                        >
                            Ke Toko
                        </button>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2
                            className={`text-4xl font-bold ${TEXT_LIGHT} mb-12 border-b border-gray-800 pb-4`}
                        >
                            Keranjang Belanja Anda ({carts.length} Item)
                        </h2>
                        <LoadingPopup
                            isVisible={loadingPopup}
                            message="Kami sedang memeriksa pesanan dan stok untuk Anda."
                            showMessage={true}
                        />
                        {/* Cart Items List */}
                        <div className="space-y-6">
                            {carts.map((item: CartI) => {
                                const tempValue = tempValues[item.id] ?? item.quantity.toString();
                                return (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1C1C1C] rounded-lg shadow-xl border border-gray-800"
                                    >
                                        <div className="flex items-center w-full sm:w-1/2">
                                            <img
                                                src={item.thumbnail.image_url}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4 border border-gray-700"
                                                onError={(e: any) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://placehold.co/64x64/1C1C1C/FFF?text=IMG";
                                                }}
                                            />
                                            <div>
                                                <h3 className={`font-semibold ${TEXT_LIGHT}`}>
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
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className={`p-1 rounded-full border border-gray-700 ${TEXT_LIGHT} hover:bg-gray-700`}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <input
                                                    type="text"
                                                    value={tempValue}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setTempValues(value);

                                                        if (value === "") return;
                                                        const parsed = parseInt(value, 10);
                                                        if (!isNaN(parsed) && parsed >= 1) {
                                                            const delta = parsed - item.quantity;
                                                            updateQuantity(item.id, delta);
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        if (tempValue === "") {
                                                            setTempValues("1");
                                                            updateQuantity(item.id, 1 - item.quantity);
                                                        }
                                                    }}
                                                    className={`w-14 text-center rounded-md border border-gray-700 bg-transparent ${TEXT_LIGHT} focus:outline-none focus:ring-2 focus:ring-[#AA8844]`}
                                                    style={{ MozAppearance: "textfield" }}
                                                    onWheel={(e) => e.currentTarget.blur()}
                                                />

                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
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
                                            <p className={`font-semibold ${TEXT_LIGHT} hidden sm:block`}>
                                                Rp
                                                {(
                                                    item.price * (isNaN(item.quantity) ? 0 : item.quantity)
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
                                );
                            })}
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
                                <span className={`text-xl font-bold ${TEXT_LIGHT}`}>Total:</span>
                                <span
                                    className={`text-3xl font-extrabold ${ACCENT_COLOR_CLASS}`}
                                >
                                    Rp{cartTotal.toLocaleString("id-ID")}
                                </span>
                            </div>
                            <section>
                                <CheckoutForm onSubmit={onSubmit} />
                            </section>
                        </div>
                    </div>
                )
            }
        </section>
    );
};


export default CartPage;
