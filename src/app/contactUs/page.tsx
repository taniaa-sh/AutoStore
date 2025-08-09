"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function ContactUs() {

    const [loading, setLoading] = useState(true);

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const subject = formData.get('title')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        if (subject.length > 80) {
            toast.error("Title cannot exceed 80 characters");
            return;
        }

        if (message.length > 500) {
            toast.error("Message text cannot exceed 500 characters");
            return;
        }

        if (!message) {
            toast.error("Please enter the message text");
            return;
        }

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('taniashafiee78@gmail.com')}&body=${encodeURIComponent(message)}&su=${encodeURIComponent(subject)}`;
        window.open(mailtoLink, '_blank');
    }

    return (
        <div className='flex flex-col gap-20 pt-0'>
            <Image
                src="/contactHeader.png"
                alt="contactUs"
                width={1440}
                height={200}
                className="object-cover w-full h-[250px] md:h-[400px]"
            />

            <div className="flex flex-col md:flex-row gap-6 px-5 max-w-screen-2xl mx-auto">
                {/* Contact Info */}
                <div className="p-6 md:p-12 flex flex-col gap-12 bg-[#F5F5F5] rounded-xl w-full">
                    <p className="text-xl md:text-2xl font-bold text-[#414651]">Ways to contact us</p>
                    <div className="flex flex-col gap-10">
                        {/* Address */}
                        <div className="flex gap-4">
                            <Image src="/location.png" alt="location" width={44} height={44} className="object-contain" />
                            <span className="w-px h-20 bg-[#007AFF]" />
                            <div className="flex flex-col gap-1">
                                <p className="text-base md:text-xl text-[#717680]">Address</p>
                                <p className="text-lg md:text-xl font-semibold text-[#252B37]">Tehran, Iran</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4">
                            <Image src="/phone.png" alt="phone" width={44} height={44} className="object-contain" />
                            <span className="w-px h-20 bg-[#007AFF]" />
                            <div className="flex flex-col gap-1">
                                <p className="text-base md:text-xl text-[#717680]">Phone Number</p>
                                <p className="text-lg md:text-xl font-semibold text-[#252B37] cursor-pointer" onClick={() => window.open("tel:+989123456789", "_self")}>+989123456789</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4">
                            <Image src="/email.png" alt="email" width={44} height={44} className="object-contain" />
                            <span className="w-px h-20 bg-[#007AFF]" />
                            <div className="flex flex-col gap-1">
                                <p className="text-base md:text-xl text-[#717680]">Email</p>
                                <p className="text-sm md:text-xl font-semibold text-[#252B37] cursor-pointer" onClick={() => window.open("mailto:taniashafiee78@gmail.com", "_self")}>taniashafiee78@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="bg-[#F5F5F5] rounded-xl w-full h-[300px] md:h-auto overflow-hidden relative">
                    {loading && (
                        <div>
                            <Image
                                src={"/loading.svg"}
                                width={60}
                                height={60}
                                style={{
                                    filter: "brightness(0) saturate(100%) invert(46%) sepia(42%) saturate(2564%) hue-rotate(192deg) brightness(99%) contrast(99%)"
                                }}
                                alt="loading"
                                className="self-center loading-svg absolute left-0 right-0 top-6 m-auto h-full"
                            />
                        </div>
                    )}

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.20055233492!2d51.35885267575882!3d35.69668207258222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00962e8efa03%3A0xe849b5604b3f3b5a!2sTehran%20Province%2C%20Tehran%2C%20District%2010%2C%20S%20Zanjan%20Behnoud%20St%2C%20Iran!5e0!3m2!1sen!2s!4v1753865333021!5m2!1sen!2s"
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => setLoading(false)}
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-8 px-10 lg:px-[200px] max-w-screen-xl mx-auto w-full" onSubmit={handleClick}>
                <p className="text-xl md:text-2xl font-bold text-[#414651]">Connect with us</p>

                <div>
                    <label className="text-base md:text-xl font-semibold text-[#252B37]" htmlFor="title">Title</label>
                    <input
                        className="border border-[#007AFF] bg-[#F5F5F5] rounded-xl w-full p-3 focus:outline-none focus:border-[#3254aa]"
                        type="text"
                        placeholder="Write your title"
                        id="title"
                        name="title"
                    />
                </div>

                <div>
                    <label className="text-base md:text-xl font-semibold text-[#252B37]" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="border border-[#007AFF] bg-[#F5F5F5] rounded-xl w-full p-3 resize-none focus:outline-none focus:border-[#3254aa]"
                        rows={5}
                        placeholder="Write your message here"
                    />
                </div>

                <button
                    className="w-full sm:w-20 text-base md:text-xl font-semibold self-end bg-[#007AFF] p-3 md:p-4 rounded-lg text-white cursor-pointer hover:bg-[#3254aa]"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
