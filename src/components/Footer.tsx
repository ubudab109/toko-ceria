import React from "react";
import {
    ACCENT_COLOR_CLASS,
    DARK_BG,
    TEXT_LIGHT,
    TEXT_MUTED,
} from "../constant/mock";
import Logo from "./Logo";

const Footer = () => (
    <footer className={`${DARK_BG} border-t border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand Info */}
                <div>
                    <div className="mb-4">
                        {/* Logo in footer, not a button */}
                        <Logo size="text-xl" />
                    </div>
                    <p className={`text-sm ${TEXT_MUTED}`}>
                        Destinasi online utama untuk spirit dan minuman lokal
                        terbaik Indonesia. Cicipi tradisi.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>
                        Tautan Cepat
                    </h4>
                    <ul className="space-y-2">
                        {["Semua Produk", "Arak", "Brem", "Tentang Kami"].map(
                            (item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className={`text-sm ${TEXT_MUTED} hover:text-white transition duration-200`}
                                    >
                                        {item}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>
                        Layanan
                    </h4>
                    <ul className="space-y-2">
                        {[
                            "FAQ",
                            "Pengiriman & Pengembalian",
                            "Kebijakan Privasi",
                            "Ketentuan Layanan",
                        ].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className={`text-sm ${TEXT_MUTED} hover:text-white transition duration-200`}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className={`text-lg font-semibold ${TEXT_LIGHT} mb-4`}>
                        Kontak
                    </h4>
                    <p className={`text-sm ${TEXT_MUTED}`}>
                        Email: tokoceriagrup@gmail.com
                    </p>
                    <p className={`text-sm ${TEXT_MUTED}`}>
                        Telepon: +62 858-4650-1669
                    </p>
                    <div className="mt-4 flex space-x-3">
                        {/* Social Icons Placeholder */}
                        {/* <a
                            href="#"
                            className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}
                        >
                            FB
                        </a> */}
                        <a
                            href="https://www.instagram.com/tokcer.co/"
                            target="_blank"
                            rel="noreferer"
                            className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}
                        >
                            Instagram
                        </a>
                        {/* <a
                            href="#"
                            className={`${ACCENT_COLOR_CLASS} hover:text-white transition duration-200`}
                        >
                            TW
                        </a> */}
                    </div>
                </div>
            </div>

            <div
                className={`mt-10 pt-6 border-t border-gray-800 text-center ${TEXT_MUTED} text-sm`}
            >
                © {new Date().getFullYear()} Toko Ceria. Dibuat dengan spirit
                Indonesia.
            </div>
        </div>
    </footer>
);

export default Footer;
