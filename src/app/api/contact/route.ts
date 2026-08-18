import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_RECIPIENT = "jibonchokro2000@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            name,
            email,
            subject,
            message,
        }: {
            name?: string;
            email?: string;
            subject?: string;
            message?: string;
        } = body;

        const cleanName = name?.trim() ?? "";
        const cleanEmail = email?.trim() ?? "";
        const cleanSubject = subject?.trim() ?? "";
        const cleanMessage = message?.trim() ?? "";

        // Name
        if (!cleanName) {
            return NextResponse.json(
                {
                    error: "আপনার নাম লিখুন।",
                },
                {
                    status: 400,
                }
            );
        }

        if (cleanName.length > 100) {
            return NextResponse.json(
                {
                    error: "নাম ১০০ অক্ষরের মধ্যে হতে হবে।",
                },
                {
                    status: 400,
                }
            );
        }

        // Email
        if (!cleanEmail) {
            return NextResponse.json(
                {
                    error: "আপনার ইমেইল ঠিকানা লিখুন।",
                },
                {
                    status: 400,
                }
            );
        }

        if (!EMAIL_PATTERN.test(cleanEmail)) {
            return NextResponse.json(
                {
                    error: "সঠিক ইমেইল ঠিকানা দিন।",
                },
                {
                    status: 400,
                }
            );
        }

        if (cleanEmail.length > 254) {
            return NextResponse.json(
                {
                    error: "ইমেইল ঠিকানাটি অনেক দীর্ঘ।",
                },
                {
                    status: 400,
                }
            );
        }

        // Subject
        if (!cleanSubject) {
            return NextResponse.json(
                {
                    error: "বার্তার বিষয় লিখুন।",
                },
                {
                    status: 400,
                }
            );
        }

        if (cleanSubject.length > 200) {
            return NextResponse.json(
                {
                    error: "বিষয় ২০০ অক্ষরের মধ্যে হতে হবে।",
                },
                {
                    status: 400,
                }
            );
        }

        // Message
        if (!cleanMessage) {
            return NextResponse.json(
                {
                    error: "আপনার বার্তা লিখুন।",
                },
                {
                    status: 400,
                }
            );
        }

        if (cleanMessage.length > 5000) {
            return NextResponse.json(
                {
                    error: "বার্তা ৫০০০ অক্ষরের মধ্যে হতে হবে।",
                },
                {
                    status: 400,
                }
            );
        }

        const { error } = await resend.emails.send({
            from:
                process.env.CONTACT_FROM_EMAIL ??
                "Jibonchokro Contact <onboarding@resend.dev>",
            to: CONTACT_RECIPIENT,
            replyTo: cleanEmail,
            subject: `যোগাযোগ: ${cleanSubject}`,
            text: [
                `নাম: ${cleanName}`,
                `ইমেইল: ${cleanEmail}`,
                `বিষয়: ${cleanSubject}`,
                `বার্তা:`,
                cleanMessage,
            ].join("\n\n"),
        });

        if (error) {
            console.error("Resend contact error:", error);

            return NextResponse.json(
                {
                    error: "বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({
            success: true,
            message: "বার্তা সফলভাবে পাঠানো হয়েছে।",
        });
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            {
                error: "সার্ভারে একটি সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
            },
            {
                status: 500,
            }
        );
    }
}