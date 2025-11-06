import React, { useState } from "react";
import { CustomerFormDataI } from "../interface/CustomerInterface";
import { DARK_BG, TEXT_LIGHT } from "../constant/mock";



export default function CheckoutForm({ onSubmit }: { onSubmit: (data: CustomerFormDataI) => void }) {
    const [form, setForm] = useState<CustomerFormDataI>({
        fullname: "",
        email: "",
        phone_code: "62",
        phone_number: "",
        age: 21,
        address: "",
        know_from: "",
        checkout_type: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | number | boolean = value;

        if (type === "checkbox" && e.target instanceof HTMLInputElement) {
            newValue = e.target.checked;
        }

        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const isFormValid =
        form.fullname.trim() &&
        form.email.trim() &&
        form.phone_number.trim() &&
        form.age >= 21 &&
        form.address.trim() &&
        form.checkout_type;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className={`max-w-full mx-auto ${DARK_BG} rounded-2xl shadow-md p-6 space-y-4`}>
            <h2 className={`text-xl ${TEXT_LIGHT} font-semibold mb-4`}>Form Checkout</h2>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Nama Lengkap *</label>
                <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                    placeholder="example@mail.com"
                />
            </div>

            <div className="flex gap-2">
                <div className="w-1/3">
                    <label className="block text-sm text-white font-medium mb-1">Kode Nomor *</label>
                    <select
                        className="w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400" name="phone_code"
                        value={form.phone_code}
                        onChange={handleChange}
                    >
                        <option value="62">+62</option>
                    </select>
                </div>
                <div className="w-2/3">
                    <label className="block text-sm text-white font-medium mb-1">Nomor HP *</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                        placeholder="8123456789"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Umur *</label>
                <input
                    type="number"
                    name="age"
                    min={21}
                    value={form.age}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                />
            </div>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Alamat *</label>
                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                    rows={2}
                />
            </div>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Kenal TOKCER darimana?</label>
                <input
                    type="text"
                    name="know_from"
                    value={form.know_from}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                    placeholder="Contoh: Instagram, Teman, Website..."
                />
            </div>

            <div>
                <label className="block text-sm text-white font-medium mb-1">Notes</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className={`w-full border-b border-[#AA8844] focus:border-[#AA8844] focus:outline-none focus:ring-0 rounded-none p-2 bg-transparent text-white placeholder-gray-400`}
                    rows={2}
                    placeholder="Catatan tambahan untuk pesanan Anda"
                />
            </div>

            <div className="flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    name="checkout_type"
                    checked={form.checkout_type === 'whatsapp'}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            checkout_type: e.target.value
                        });
                    }}
                    value="whatsapp"
                    className="w-4 h-4 accent-green-600"
                />
                <label className="text-sm font-medium text-white">Checkout via WhatsApp</label>
            </div>

            <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full mt-4 py-2 rounded-lg font-semibold ${isFormValid
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
            >
                Checkout
            </button>
        </form>
    );
}
