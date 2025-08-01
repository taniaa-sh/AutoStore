"use client";

import Image from 'next/image'
import React from 'react'

function ContactUs() {

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const subject = formData.get('title')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('taniashafiee78@gmail.com')}&body=${encodeURIComponent(message)}&su=${encodeURIComponent(subject)}`;
        window.open(mailtoLink, '_blank');
    }

    return (
        <div className='flex flex-col gap-20 pt-0'>
            <Image
                src="/backgound.jpg"
                alt="contactUs"
                width={1440}
                height={200}
                className='object-contain !w-full h-[700px]'
            />
            <div className='flex gap-4 px-[200px] mx-auto mb-20'>
                <div className='p-12 flex flex-col gap-16 bg-[#F5F5F5] rounded-xl'>
                    <p className='text-2xl font-bold text-[#414651]'>Ways to contact us</p>
                    <div className='flex flex-col gap-11'>
                        <div className='flex gap-6'>
                            <Image
                                src="/location.png"
                                alt="location"
                                width={44}
                                height={44}
                                className='object-contain'
                            />
                            <span className='w-px h-20 bg-[#007AFF]' />
                            <div className='flex flex-col gap-3'>
                                <p className='text-2xl font-normal text-[#717680]'>Address</p>
                                <p className='text-3xl font-semibold text-[#252B37]'>Tehran, Iran</p>
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <Image
                                src="/phone.png"
                                alt="phone"
                                width={44}
                                height={44}
                                className='object-contain'
                            />
                            <span className='w-px h-20 bg-[#007AFF]' />
                            <div className='flex flex-col gap-3'>
                                <p className='text-2xl font-normal text-[#717680]'>phone number</p>
                                <p className='text-3xl font-semibold text-[#252B37]'>+989123456789</p>
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <Image
                                src="/email.png"
                                alt="email"
                                width={44}
                                height={44}
                                className='object-contain min-h-[44px]'
                            />
                            <span className='w-px h-20 bg-[#007AFF]' />
                            <div className='flex flex-col gap-3'>
                                <p className='text-2xl font-normal text-[#717680]'>Email</p>
                                <p className='text-3xl font-semibold text-[#252B37]'>taniashafiee78@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#F5F5F5] rounded-xl'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.20055233492!2d51.35885267575882!3d35.69668207258222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00962e8efa03%3A0xe849b5604b3f3b5a!2sTehran%20Province%2C%20Tehran%2C%20District%2010%2C%20S%20Zanjan%20Behnoud%20St%2C%20Iran!5e0!3m2!1sen!2s!4v1753865333021!5m2!1sen!2s"
                        width="600"
                        height="520"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
            <form className='flex flex-col gap-10 px-[200px]' onSubmit={handleClick}>
                <p className='text-2xl font-bold text-[#414651]'>conect with us</p>
                <div>
                    <label className='text-2xl font-semibold text-[#252B37]' htmlFor='title'>Title</label>
                    <input
                        className="border border-[#007AFF] bg-[#F5F5F5] rounded-xl w-full p-3 focus:outline-none focus:border-[#3254aa]"
                        type="text"
                        placeholder="Write your title"
                        id='title'
                        name='title'
                    />
                </div>
                <div>
                    <label className='text-2xl font-semibold text-[#252B37]' htmlFor='message'>Title</label>
                    <textarea
                        id='message'
                        name='message'
                        className="border border-[#007AFF] bg-[#F5F5F5] rounded-xl w-full p-3 resize-none focus:outline-none focus:border-[#3254aa]"
                        rows={5}
                        placeholder="Write your message here"
                    />
                </div>
                <button
                    className='text-xl font-semibold self-end bg-[#007AFF] p-4 rounded-lg text-white cursor-pointer hover:bg-[#3254aa]'
                    type='submit'
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default ContactUs