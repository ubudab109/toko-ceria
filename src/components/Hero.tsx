import React from 'react';
import { ACCENT_COLOR_CLASS, DARK_BG, TEXT_LIGHT, TEXT_MUTED } from '../constant/mock';
import { ArrowRight } from 'lucide-react';

const Hero = ({ setPage }) => (
    <section className={`${DARK_BG} py-20 md:py-32 border-b border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1
                    className={`text-5xl md:text-7xl font-extrabold tracking-tight ${TEXT_LIGHT} leading-tight`}
                >
                    Jiwa <span className={ACCENT_COLOR_CLASS}>Nusantara</span>
                </h1>
                <p
                    className={`mt-4 text-lg md:text-xl ${TEXT_MUTED} max-w-lg mx-auto md:mx-0`}
                >
                    Temukan spirit artisan terbaik Indonesia. Tradisi
                    berabad-abad disempurnakan untuk selera modern.
                </p>
                <button
                    onClick={() => setPage("products")}
                    // FIX: Use literal hex code for background
                    className={`mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-[#AA8844] hover:bg-opacity-80 transition duration-300 group`}
                >
                    Jelajahi Koleksi Kami
                    <ArrowRight
                        size={20}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>
            </div>

            {/* Mock Image */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="./tokcer/amerta.png"
                    alt="Featured Premium Indonesian Spirit"
                    // FIX: Use literal hex code for shadow color
                    className="w-64 md:w-80 h-auto object-cover rounded-lg shadow-[0_0_50px_rgba(170,136,68,0.5)] transition duration-500 hover:scale-[1.03] grayscale hover:grayscale-0"
                />
            </div>
        </div>
    </section>
);

export default Hero;
