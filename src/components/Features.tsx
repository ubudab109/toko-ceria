import { Lock, Star, Truck } from 'lucide-react';
import React from 'react';
import { ACCENT_COLOR_CLASS, TEXT_LIGHT, TEXT_MUTED } from '../constant/mock';

const Features = () => {
    const featuresData = [
        {
            icon: Truck,
            title: "Pengiriman Cepat",
            description: "Layanan nasional dengan kemasan aman dan terjamin.",
        },
        {
            icon: Lock,
            title: "Pembayaran Aman",
            description: "Gateway pembayaran terenkripsi (berbasis WhatsApp).",
        },
        {
            icon: Star,
            title: "Kualitas Artisan",
            description:
                "Spirit pilihan dengan warisan budaya dan mutu terjamin.",
        },
    ];

    return (
        <section className="bg-[#1C1C1C] py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {featuresData.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center p-4">
                        <feature.icon
                            size={36}
                            className={`${ACCENT_COLOR_CLASS} mb-3`}
                        />
                        <h3
                            className={`text-xl font-semibold ${TEXT_LIGHT} mb-1`}
                        >
                            {feature.title}
                        </h3>
                        <p className={`text-sm ${TEXT_MUTED}`}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
