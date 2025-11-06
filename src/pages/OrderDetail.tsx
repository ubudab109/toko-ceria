import React, { useCallback, useEffect, useState } from "react";
import {
    DARK_BG,
    TEXT_LIGHT,
} from "../constant/mock";
import LoadingPopup from "../components/LoadingPopup";
import { CheckoutDataI } from "../interface/CheckoutInterface";
import CheckoutDetails from "../components/CheckoutDetails";
import { ProductOrderI } from "../interface/OrderInterface";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";


const OrderDetailPage = () => {
    const [loadingPopup, setLoadingPopup] = useState<boolean>(false);
    const [cartDetails, setCartDetails] = useState<CheckoutDataI | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // --- Checkout Logic (WhatsApp) ---
    const handleCheckout = useCallback(() => {
        const adminPhoneNumber = "6285846501669";
        let message = `Halo Admin Toko Ceria, saya telah memesan dari website`;
        message += ` dengan nomor order ${cartDetails?.order_number}:%0A%0A`;
        if (cartDetails) {
            cartDetails.products.forEach((item: ProductOrderI) => {
                const itemTotal = item.product.price * item.quantity;
                message += `${item.quantity}x ${item.product.name} (@Rp${item.product.price.toLocaleString(
                    "id-ID"
                )}) - Total: Rp${itemTotal.toLocaleString("id-ID")}%0A`;
            });

            message += `%0A*Total Nilai Pesanan:* Rp${cartDetails.total.toLocaleString(
                "id-ID"
            )}%0A%0A`;
            message += `Mohon konfirmasi detail pesanan akhir, biaya pengiriman, dan metode pembayaran. Terima kasih!`;

            const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, "_blank");
        }
    }, [cartDetails]);

    const getDetailOrder = async () => {
        setLoadingPopup(true);
        try {
            const res = await api.get(`/checkout-order?orderNumber=${searchParams.get('orderNumber')}`);
            const {customer, order_number, product_orders, total, status} = res.data.data;
            setCartDetails({
                customer,
                order_number,
                products: product_orders,
                total: typeof total === 'string' ? parseInt(total): total,
                status
            })
        } catch (err: any) {
            if (err.status === 404) {
                navigate('/order-not-found');
            } else {
                toast.error('Terjadi kesalahan. Mohon ulangi proses Anda');
                navigate('/');
            }
        } finally {
            setLoadingPopup(false);
        }
    };

    useEffect(() => {
        getDetailOrder();
    }, []);

    return (
        <section className={`${DARK_BG} py-16 md:py-24 min-h-screen'}`}>
            {
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2
                        className={`text-4xl font-bold ${TEXT_LIGHT} mb-12 border-b border-gray-800 pb-4`}
                    >
                        Detail pesanan Anda
                    </h2>
                    <LoadingPopup
                        isVisible={loadingPopup}
                        message="Sedang menyiapkan detail pesanan Anda"
                        showMessage={true}
                    />

                    {/* Cart Summary & Checkout */}
                    <div className="mt-10 p-6 bg-[#1C1C1C] rounded-lg shadow-2xl border border-[#AA8844]/50">
                        <h3 className={`text-2xl font-bold ${TEXT_LIGHT} mb-4`}>
                            Ringkasan Pesanan
                        </h3>
                        <section>
                            {
                                cartDetails && (
                                    <CheckoutDetails
                                        checkoutData={cartDetails}
                                        onDone={() => handleCheckout()}
                                    />
                                )
                            }
                        </section>
                    </div>
                </div>
            }
        </section>
    );
};

export default OrderDetailPage;
