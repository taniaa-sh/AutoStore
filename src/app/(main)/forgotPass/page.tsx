"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPass() {

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const recoveryHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!phoneNumber) {
            toast.error("Phone number is required");
            return;
        } else if (phoneNumber.length < 11) {
            toast.error("Phone number must be at least 11 characters long");
            return;
        } else if (!phoneNumber.includes("09")) {
            toast.error("Phone number is invalid");
            return;
        } else {
            setLoading(true);
            setTimeout(() => {
                toast.success("Recovery link sent successfully");
                setLoading(false);
            }, 2000);
        }
    }

    return (
        <main className="bg-gradient-to-br from-blue-300 via-white to-blue-50 p-6 min-h-screen w-full">
            <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden h-[280px] p-6 mt-52">
                <p className="text-center text-sm md:text-lg font-medium">Can not log in?</p>
                <form className="mt-4" onSubmit={recoveryHandler}>
                    <div>
                        <label
                            className="text-sm md:text-base font-normal mt-4"
                            htmlFor="mobileNumber"
                        >
                            We will send a recovery link to
                        </label>
                        <input
                            name="mobile"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type=""
                            id="mobileNumber"
                            maxLength={11}
                            placeholder="Enter your phone number"
                            className="w-full mt-2 h-12 px-4 py-2 pr-12 text-xs md:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            type="submit"
                            className="w-full h-12 px-4 py-2 text-sm md:text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4"
                        >

                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            ) : "Send recovery link"}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link href="/signin" className="text-sm font-medium underline self-center text-blue-600 mt-6">Back to login</Link>
                </div>
            </div>
        </main>
    );
}

export default ForgotPass;