import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BROWN_DARK_BG, DARK_BG } from '../constant/mock';

const OrderSearchPage = () => {
    const navigate = useNavigate();
    const [orderNumber, setOrderNumber] = useState<string>('');

    return (
        <div className="p-8">
            <div className={`${BROWN_DARK_BG} p-6 rounded-xl shadow-2xl border-gray-800 text-white max-w-1/2 mx-auto`}>

                {/* --- Header: Error Message --- */}
                <div className="flex flex-col items-center text-center mb-6 pt-2">

                    {/* Error Icon: Red Alert Triangle */}
                    <Search className="w-12 h-12 mb-4 animate-pulse" />

                    {/* Title */}
                    <h2 className="text-2xl font-bold">
                        Lacak pesanan Anda disini.
                    </h2>

                    {/* Main Instruction Message */}
                    <p className="mt-3 text-lg text-gray-300">
                        Mohon pastikan nomor pesanan telah sesuai.
                    </p>
                </div>

                {/* --- Quick Action/Help Links (Optional, adapted from Customer Info) --- */}
                <div className="border-t border-gray-700 pt-4 mt-6">
                    <input
                        type="email"
                        name="email"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                        placeholder="Contoh: TOKCER-ORDER/06112025/000012"
                    />
                </div>

                {/* --- Primary Action Button (Retry or Back) --- */}
                <button
                    disabled={orderNumber === ''}
                    onClick={() => {
                        navigate(`/order?orderNumber=${orderNumber}`)
                    }}
                    className={`mt-8 w-full py-4 text-lg font-bold ${DARK_BG} hover:bg-gray-900 rounded-full transition duration-300 flex items-center justify-center shadow-lg`}
                >
                    <Search className="mr-2 w-5 h-5" /> Cari
                </button>

            </div>
        </div>
    )
};

export default OrderSearchPage;
