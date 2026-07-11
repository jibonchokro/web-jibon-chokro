"use client";

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";

import {
    Check,
    Copy,
    Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({
    url,
    title,
}: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [sharing, setSharing] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        setCanShare(
            typeof navigator !== "undefined" &&
            typeof navigator.share === "function"
        );
    }, []);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    }

    async function nativeShare() {
        if (!navigator.share) {
            return;
        }

        try {
            setSharing(true);

            await navigator.share({
                title,
                text: title,
                url,
            });
        } catch {
            // User cancelled sharing
        } finally {
            setSharing(false);
        }
    }

    return (
        <section className="mt-8 border-t border-gray-200 pt-8">

            <h2 className="mb-5 text-lg font-semibold">
                শেয়ার করুন
            </h2>

            <div className="flex flex-wrap items-center gap-3">

                <FacebookShareButton
                    url={url}
                    hashtag="#জীবনচক্র"
                >
                    <FacebookIcon
                        size={42}
                        round
                    />
                </FacebookShareButton>

                <TwitterShareButton
                    url={url}
                    title={title}
                >
                    <XIcon
                        size={42}
                        round
                    />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={url}
                    title={title}
                >
                    <WhatsappIcon
                        size={42}
                        round
                    />
                </WhatsappShareButton>

                <TelegramShareButton
                    url={url}
                    title={title}
                >
                    <TelegramIcon
                        size={42}
                        round
                    />
                </TelegramShareButton>

                <LinkedinShareButton
                    url={url}
                    title={title}
                >
                    <LinkedinIcon
                        size={42}
                        round
                    />
                </LinkedinShareButton>

                <button
                    type="button"
                    onClick={copyLink}
                    title="Copy link"
                    aria-label="Copy link"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-gray-300 transition hover:border-green-700 hover:bg-green-50"
                >
                    {copied ? (
                        <Check
                            size={18}
                            className="text-green-700"
                        />
                    ) : (
                        <Copy
                            size={18}
                            className="text-gray-700"
                        />
                    )}
                </button>

                {canShare && (
                    <button
                        type="button"
                        onClick={nativeShare}
                        disabled={sharing}
                        title="Share using your device"
                        aria-label="Share using your device"
                        className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-gray-300 transition hover:border-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Share2
                            size={18}
                            className="text-gray-700"
                        />
                    </button>
                )}

            </div>

        </section>
    );
}