'use client';

import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
} from 'react-share';

interface ShareModalProps {
    setShowShareModal: (show: boolean) => void;
}

export default function ShareModal({ setShowShareModal }: ShareModalProps) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="flex fixed inset-0 w-full h-full bg-black/40 z-50 items-center justify-center">
            <div className="z-50 p-8 rounded-xl bg-white flex flex-col gap-8 w-[250px] md:w-[400px] relative">
                {/* Close button */}
                <button
                    onClick={() => setShowShareModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold !cursor-pointer"
                >
                    ×
                </button>

                <h2 className="text-lg font-bold mb-4 text-blue-700">Share this product</h2>

                <div className="flex justify-center gap-4 mb-4">
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={40} round />
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={40} round />
                    </TwitterShareButton>

                    <TelegramShareButton url={shareUrl}>
                        <TelegramIcon size={40} round />
                    </TelegramShareButton>

                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                </div>

                <p className="text-sm text-center text-gray-500">
                    Copy the link or share it with your friends on social media.
                </p>
            </div>
            <div
                className='absolute inset-0'
                onClick={() => setShowShareModal(false)}
            />
        </div>
    );
}
