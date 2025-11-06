import React from "react";
import { ShoppingCart, User, Mail, Phone, MapPin, Hash, CheckCircle, CardSimIcon } from "lucide-react";
import { CheckoutDataI } from "../interface/CheckoutInterface";
import { statusMap } from "../types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface CheckoutDetailsProps {
    checkoutData: CheckoutDataI;
    onDone: () => void;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
    checkoutData,
    onDone,
}) => {
    return (
        <div className="bg-[#1C1C1C] p-6 rounded-xl shadow-lg border border-gray-800 text-white">
            <div className="flex items-center mb-6">
                <CheckCircle className="text-green-500 w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Pesanan Berhasil Dibuat!</h2>
            </div>

            {/* Order Info */}
            <div className="mb-6">
                <div className="flex flex-wrap items-center text-gray-300 mb-2">
                    <Hash className="w-5 h-5 mr-2 text-[#AA8844]" />
                    <span>No. Pesanan:</span>
                    <span className="ml-2 font-semibold text-white">
                        {checkoutData.order_number}
                    </span>
                </div>
                <div className="flex items-center text-gray-300 mb-2">
                    <ShoppingCart className="w-5 h-5 mr-2 text-[#AA8844]" />
                    <span>Total:</span>
                    <span className="ml-2 font-semibold text-[#AA8844] text-lg">
                        Rp{checkoutData.total.toLocaleString("id-ID")}
                    </span>
                </div>
                <div className="flex items-center text-gray-300">
                    <CardSimIcon className="w-5 h-5 mr-2 text-[#AA8844]" />
                    <span>Status:</span>
                    <OrderStatusBadge status={checkoutData.status} className="ml-2 font-semibold text-[#AA8844] text-lg" />
                </div>
            </div>

            {/* Product List */}
            <div className="mb-6 border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-3 text-lg">Produk yang Dibeli:</h3>
                <ul className="space-y-2">
                    {checkoutData.products.map((product) => (
                        <li
                            key={product.id}
                            className="flex justify-between text-gray-300 border-b border-gray-800 pb-2"
                        >
                            <span>
                                {product.product.name}{" "}
                                <span className="text-sm text-gray-500">x{product.quantity}</span>
                            </span>
                            <span className="text-gray-200">
                                Rp{(product.product.price * product.quantity).toLocaleString("id-ID")}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Customer Info */}
            <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-3 text-lg">Data Customer:</h3>
                <div className="space-y-2 text-gray-300">
                    <p className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-[#AA8844]" />
                        {checkoutData.customer.fullname}
                    </p>
                    <p className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-[#AA8844]" />
                        {checkoutData.customer.email}
                    </p>
                    <p className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-[#AA8844]" />
                        {checkoutData.customer.phone_code} {checkoutData.customer.phone_number}
                    </p>
                    <p className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-[#AA8844]" />
                        {checkoutData.customer.address}
                    </p>
                </div>
            </div>

            {/* Back or Done button */}
            <button
                onClick={onDone}
                className="mt-8 w-full py-4 text-lg font-bold bg-green-600 hover:bg-green-700 rounded-full transition duration-300 flex items-center justify-center"
            >
                <CheckCircle className="mr-2" /> Kontak Admin
            </button>
        </div>
    );
};

export default CheckoutDetails;
