// src/components/LoadingPopup.jsx
import React from 'react';
import {
    PRIMARY_COLOR_ACCENT,
    TEXT_LIGHT,
    BROWN_DARK_BG
} from '../constant/mock'; // Adjust path to your constants file
// Note: LOGO_URL is used directly in the <img> tag
// Note: ACCENT_COLOR_CLASS is used via dynamic class below

interface LoadingPopupProps {
    isVisible: boolean;
    showMessage?: boolean;
    message?: string;
}
const LoadingPopup = ({
    isVisible,
    showMessage = false,
    message = '',
}: LoadingPopupProps) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`p-8 rounded-xl shadow-2xl max-w-sm w-full ${BROWN_DARK_BG.replace('bg-', 'bg-')}`}
                style={{ border: `2px solid ${PRIMARY_COLOR_ACCENT}` }}
            >
                <div className="flex flex-col items-center space-y-4">

                    {/* Logo Section */}
                    <img
                        src="/logo/logo.png"
                        alt="Toko Ceria Logo"
                        className="w-32 rounded-full"
                    />

                    {/* Animation Section - Using Tailwind for a simple 'cheers' effect */}
                    <div className="relative h-10 w-full flex justify-center items-center">
                        {/* Left Glass */}
                        <span
                            className={`text-3xl absolute animate-cheer-left`}
                            style={{ color: PRIMARY_COLOR_ACCENT }}
                            role="img"
                            aria-label="Left glass"
                        >
                            🥂
                        </span>
                        {/* Right Glass */}
                        <span
                            className={`text-3xl absolute animate-cheer-right`}
                            style={{ color: PRIMARY_COLOR_ACCENT, marginLeft: '20px' }} // Small offset
                            role="img"
                            aria-label="Right glass"
                        >
                            🥂
                        </span>
                    </div>

                    {
                        showMessage ? (
                            <>
                                <p className={`text-center text-lg font-semibold ${TEXT_LIGHT.replace('text-', 'text-')}`}>
                                    {message}
                                </p>
                                <p className={`text-center text-sm ${TEXT_LIGHT.replace('text-', 'text-')}`}>
                                    Mohon tunggu sebentar...
                                </p>
                            </>
                ) : null
                    }

                {/* Optional: Simple loading indicator */}
                <div className="mt-4 w-full bg-gray-600 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="h-full rounded-full animate-pulse"
                        style={{ backgroundColor: PRIMARY_COLOR_ACCENT, width: '100%' }}
                    ></div>
                </div>
            </div>
        </div>
        </div >
    );
};

export default LoadingPopup;