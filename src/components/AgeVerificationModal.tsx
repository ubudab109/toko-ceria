import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { ACCENT_COLOR_CLASS, BROWN_DARK_BG, TEXT_LIGHT, TEXT_MUTED } from "../constant/mock";
import React from 'react';

const AgeVerificationModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: (confirmed: boolean) => void }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
            <div className={`${BROWN_DARK_BG} rounded-xl shadow-2xl p-8 max-w-sm w-full transform transition-all scale-100`}>
                <div className="text-center">
                    <AlertTriangle size={48} className={`mx-auto mb-4 ${ACCENT_COLOR_CLASS}`} />
                    <h2 className={`text-2xl font-bold ${TEXT_LIGHT} mb-2`}>Konfirmasi Usia</h2>
                    <p className={`${TEXT_MUTED} mb-6`}>
                        Dengan masuk ke situs ini, Anda mengonfirmasi bahwa Anda berusia **21 tahun atau lebih**.
                        Kami berkomitmen untuk penjualan yang bertanggung jawab.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => onClose(true)}
                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold bg-[#AA8844] hover:bg-[#997733] transition-colors shadow-lg shadow-[#AA8844]/30`}
                    >
                        <CheckCircle size={20} className="mr-2" />
                        Ya, Saya 21+
                    </button>
                    <button
                        onClick={() => onClose(false)}
                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg ${TEXT_MUTED} border border-gray-600 hover:bg-gray-700 transition-colors`}
                    >
                        <X size={20} className="mr-2" />
                        Belum/Di Bawah 21
                    </button>
                </div>

                {/* Custom Styling for smoother transitions */}
                <style>{`
                    .scale-100 {
                        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    }
                    @keyframes popIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default AgeVerificationModal;
