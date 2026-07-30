"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Check,
    Copy,
    Ellipsis,
    Share2,
} from "lucide-react";

import {
    FaFacebookF,
    FaLinkedinIn,
    FaTelegram,
    FaWhatsapp,
    FaXTwitter,
} from "react-icons/fa6";

import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

interface ShareButtonsProps {
    url: string;
    title: string;
}

const iconClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 transition-colors hover:border-gray-200 hover:bg-gray-100";

const itemClass =
    "flex min-w-auto shrink-0 flex-col items-center gap-1 text-center";

const labelClass =
    "text-[11px] leading-none text-muted-foreground";

export default function ShareButtons({
    url,
    title,
}: ShareButtonsProps) {
    const [open, setOpen] = useState(false);
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
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
        }
    }

    async function nativeShare() {
        if (!navigator.share) return;

        try {
            setSharing(true);

            await navigator.share({
                title,
                text: title,
                url,
            });
        } catch { }

        setSharing(false);
    }

    return (
        <section className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-muted-foreground border-none bg-muted h-[35px] w-[35px] p-0 hover:text-foreground"
            >
                <Share2 className="size-[18px]" />
            </Button>

            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className="top-auto bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 translate-y-0 rounded-t-3xl rounded-b-none p-5">
                    <DialogHeader>
                        <DialogTitle>শেয়ার করুন</DialogTitle>
                    </DialogHeader>

                    {/* Link */}

                    <div className="relative">
                        <input
                            readOnly
                            value={url}
                            className="w-full rounded-lg border border-black/10 bg-background py-2 pl-3 pr-10 text-sm outline-none"
                        />

                        <button
                            type="button"
                            onClick={copyLink}
                            className="absolute right-1 top-[2.5px] flex h-8 w-8 items-center justify-center"
                        >
                            {copied ? (
                                <Check className="size-4 text-green-600" />
                            ) : (
                                <Copy className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Share */}

                    <div className="flex items-start gap-3 overflow-hidden">

                        {/* Scrollable */}

                        <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
                            <div className="flex w-max gap-3 sm:gap-4 lg:gap-4">

                                <FacebookShareButton
                                    url={url}
                                    hashtag="#জীবনচক্র"
                                >
                                    <div className={itemClass}>
                                        <div className={iconClass}>
                                            <FaFacebookF size={18} />
                                        </div>

                                        <span className={labelClass}>
                                            Facebook
                                        </span>
                                    </div>
                                </FacebookShareButton>

                                <TwitterShareButton
                                    url={url}
                                    title={title}
                                >
                                    <div className={itemClass}>
                                        <div className={iconClass}>
                                            <FaXTwitter size={18} />
                                        </div>

                                        <span className={labelClass}>
                                            X
                                        </span>
                                    </div>
                                </TwitterShareButton>

                                <WhatsappShareButton
                                    url={url}
                                    title={title}
                                >
                                    <div className={itemClass}>
                                        <div className={iconClass}>
                                            <FaWhatsapp size={18} />
                                        </div>

                                        <span className={labelClass}>
                                            WhatsApp
                                        </span>
                                    </div>
                                </WhatsappShareButton>

                                <TelegramShareButton
                                    url={url}
                                    title={title}
                                >
                                    <div className={itemClass}>
                                        <div className={iconClass}>
                                            <FaTelegram size={18} />
                                        </div>

                                        <span className={labelClass}>
                                            Telegram
                                        </span>
                                    </div>
                                </TelegramShareButton>

                                <LinkedinShareButton
                                    url={url}
                                    title={title}
                                >
                                    <div className={itemClass}>
                                        <div className={iconClass}>
                                            <FaLinkedinIn size={18} />
                                        </div>

                                        <span className={labelClass}>
                                            LinkedIn
                                        </span>
                                    </div>
                                </LinkedinShareButton>

                            </div>
                        </div>

                        {/* Fixed More */}

                        {canShare && (
                            <button
                                type="button"
                                onClick={nativeShare}
                                disabled={sharing}
                                className={`${itemClass} disabled:opacity-50`}
                            >
                                <div className={iconClass}>
                                    <Ellipsis size={18} />
                                </div>

                                <span className={labelClass}>
                                    More
                                </span>
                            </button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}