import { AlertTriangle, RefreshCw, User } from 'lucide-react';
import React from 'react';
import { ACCENT_COLOR_CLASS, BROWN_DARK_BG } from '../constant/mock';

const OrderNotFound = () => {
    return (
        <div className="p-8">
            <div className={`${BROWN_DARK_BG} p-6 rounded-xl shadow-2xl border-gray-800 text-white max-w-1/2 mx-auto`}>

                {/* --- Header: Error Message --- */}
                <div className="flex flex-col items-center text-center mb-6 pt-2">

                    {/* Error Icon: Red Alert Triangle */}
                    <AlertTriangle className="text-red-500 w-12 h-12 mb-4 animate-pulse" />

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-red-400">
                        Data Pesanan Tidak Ditemukan
                    </h2>

                    {/* Main Instruction Message */}
                    <p className="mt-3 text-lg text-gray-300">
                        Mohon pastikan **nomor pesanan** telah sesuai.
                    </p>
                </div>

                {/* --- Quick Action/Help Links (Optional, adapted from Customer Info) --- */}
                <div className="border-t border-gray-700 pt-4 mt-6">
                    <h3 className="font-semibold mb-3 text-lg text-gray-400">Butuh Bantuan?</h3>
                    <div className="space-y-2 text-gray-300">
                        <p className="flex items-center">
                            <User className={`w-5 h-5 mr-2`} style={{ color: ACCENT_COLOR_CLASS }} />
                            Hubungi **Customer Service**
                        </p>
                        <p className="flex items-center">
                            <RefreshCw className={`w-5 h-5 mr-2`} style={{ color: ACCENT_COLOR_CLASS }} />
                            Coba cek lagi dengan nomor berbeda
                        </p>
                    </div>
                </div>

                {/* --- Primary Action Button (Retry or Back) --- */}
                <div
                    className="mt-8 w-full py-4 text-lg font-bold bg-red-600 hover:bg-red-700 rounded-full transition duration-300 flex items-center justify-center shadow-lg"
                >
                    <AlertTriangle className="mr-2 w-5 h-5" /> Cek Nomor Pesanan Kembali
                </div>

            </div>
        </div>
    );
};

export default OrderNotFound;
