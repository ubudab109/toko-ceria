import React from "react";
import { ACCENT_COLOR_CLASS, LOGO_URL } from "../constant/mock";

const Logo = ({ size = "text-md", isButton = false }) => {
    // Menggunakan flex dan items-center untuk perataan sejajar
    // space-x-4 untuk jarak yang lebih baik
    const logoClasses = `flex items-center space-x-1 ${size} font-serif tracking-widest font-bold ${ACCENT_COLOR_CLASS}`;

    const logoContent = (
        <>
            <img
                src={LOGO_URL}
                alt="Logo Toko Ceria"
                width={100} // Diperbesar menjadi 40px
                height={100} // Diperbesar menjadi 40px
                // Menggunakan w-10 h-10 dan border-2 agar lebih menonjol
                className="rounded-full w-20 h-20 object-cover"
            />
            <span>TOKO CERIA</span>
        </>
    );

    if (isButton) {
        return (
            <a
                href="/"
                className={`hover:text-white transition duration-300 ${logoClasses}`}
            >
                {logoContent}
            </a>
        );
    }

    return <span className={logoClasses}>{logoContent}</span>;
};

export default Logo;
