"use client";

import {
    CheckCircle2,
    Loader2,
    MessageCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
    className?: string;
}

export default function ContactForm({
    className = "",
}: ContactFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [sent, setSent] = useState(false);

    function resetForm() {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setError(null);
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();

        setError(null);
        setSent(false);

        if (!cleanName) {
            setError("আপনার নাম লিখুন।");
            return;
        }

        if (!cleanEmail) {
            setError("আপনার ইমেইল ঠিকানা লিখুন।");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            setError(
                "সঠিক ইমেইল ঠিকানা দিন।"
            );
            return;
        }

        if (!cleanSubject) {
            setError("বার্তার বিষয় লিখুন।");
            return;
        }

        if (!cleanMessage) {
            setError("আপনার বার্তা লিখুন।");
            return;
        }

        if (cleanMessage.length > 5000) {
            setError(
                "বার্তা ৫০০০ অক্ষরের মধ্যে হতে হবে।"
            );
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name: cleanName,
                        email: cleanEmail,
                        subject: cleanSubject,
                        message: cleanMessage,
                    }),
                }
            );

            const data =
                await response
                    .json()
                    .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ??
                    "বার্তা পাঠানো সম্ভব হয়নি।"
                );
            }

            setSent(true);

            toast.success(
                "বার্তা পাঠানো হয়েছে",
                {
                    description:
                        "আপনার বার্তার জন্য ধন্যবাদ। আমরা যত দ্রুত সম্ভব উত্তর দেওয়ার চেষ্টা করব।",
                    position:
                        "bottom-center",
                }
            );

            resetForm();
        } catch (error) {
            console.error(
                "Contact form error:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className={`rounded-2xl border border-border bg-card p-5 shadow-custom sm:p-6 md:rounded-3xl md:p-8 ${className}`}
        >
            <div className="flex items-center gap-3">
                <div className="rounded-lg border border-border bg-muted p-2 sm:rounded-xl">
                    <MessageCircle
                        size={20}
                        className="text-foreground sm:h-[22px] sm:w-[22px]"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                        আমাদের বার্তা পাঠান
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার বার্তা সরাসরি আমাদের কাছে পৌঁছাবে।
                    </p>
                </div>
            </div>

            {sent && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                    <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-foreground"
                    />

                    <div>
                        <p className="text-sm font-semibold text-foreground">
                            বার্তা সফলভাবে পাঠানো হয়েছে।
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            আমাদের সঙ্গে যোগাযোগ করার জন্য ধন্যবাদ।
                            প্রয়োজন হলে আমরা আপনার দেওয়া ইমেইলে উত্তর দেব।
                        </p>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
            >
                {/* Name + Email */}

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="contact-name"
                            className="mb-2 block text-sm font-medium text-foreground sm:text-base"
                        >
                            আপনার নাম
                        </label>

                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            maxLength={100}
                            autoComplete="name"
                            disabled={submitting}
                            placeholder="আপনার নাম লিখুন"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact-email"
                            className="mb-2 block text-sm font-medium text-foreground sm:text-base"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            maxLength={254}
                            autoComplete="email"
                            disabled={submitting}
                            placeholder="name@example.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                        />
                    </div>
                </div>

                {/* Subject */}

                <div>
                    <label
                        htmlFor="contact-subject"
                        className="mb-2 block text-sm font-medium text-foreground sm:text-base"
                    >
                        বিষয়
                    </label>

                    <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={(event) =>
                            setSubject(
                                event.target.value
                            )
                        }
                        maxLength={200}
                        disabled={submitting}
                        placeholder="বার্তার বিষয়"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                    />
                </div>

                {/* Message */}

                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <label
                            htmlFor="contact-message"
                            className="block text-sm font-medium text-foreground sm:text-base"
                        >
                            আপনার বার্তা
                        </label>

                        <span className="text-xs text-muted-foreground">
                            {message.length}/5000
                        </span>
                    </div>

                    <textarea
                        id="contact-message"
                        name="message"
                        value={message}
                        onChange={(event) =>
                            setMessage(
                                event.target.value
                            )
                        }
                        maxLength={5000}
                        rows={8}
                        disabled={submitting}
                        placeholder="আপনার বার্তা লিখুন..."
                        className="min-h-[180px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[220px] sm:text-base"
                    />
                </div>

                {/* Error */}

                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm leading-6 text-destructive"
                    >
                        {error}
                    </div>
                )}

                {/* Submit */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-muted-foreground">
                        আপনার দেওয়া ইমেইল ঠিকানায় প্রয়োজন হলে আমরা উত্তর দেব।
                    </p>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-foreground px-5 py-2 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base"
                    >
                        {submitting ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="mr-2 animate-spin"
                                />

                                পাঠানো হচ্ছে...
                            </>
                        ) : (
                            "বার্তা পাঠান"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}