import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const REPORT_RECIPIENT = "jibonchokro2000@gmail.com";

const REPORT_REASON_LABELS: Record<string, string> = {
    incorrect_information: "ভুল তথ্য",
    spam: "স্প্যাম",
    inappropriate: "অনুপযুক্ত কনটেন্ট",
    copyright: "কপিরাইট লঙ্ঘন",
    other: "অন্যান্য",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            postId,
            postTitle,
            postUrl,
            reason,
            description,
            reporterEmail,
        }: {
            postId?: string;
            postTitle?: string;
            postUrl?: string;
            reason?: string;
            description?: string;
            reporterEmail?: string;
        } = body;

        if (!postId || !postUrl) {
            return NextResponse.json(
                {
                    error: "Missing post information.",
                },
                {
                    status: 400,
                }
            );
        }

        const reasonLabel =
            reason && REPORT_REASON_LABELS[reason];

        if (!reasonLabel) {
            return NextResponse.json(
                {
                    error: "Please choose a valid reason.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!description || !description.trim()) {
            return NextResponse.json(
                {
                    error: "Please describe the problem.",
                },
                {
                    status: 400,
                }
            );
        }

        if (description.length > 2000) {
            return NextResponse.json(
                {
                    error: "Description is too long.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            reporterEmail &&
            !EMAIL_PATTERN.test(reporterEmail)
        ) {
            return NextResponse.json(
                {
                    error: "Invalid email address.",
                },
                {
                    status: 400,
                }
            );
        }

        const { error } = await resend.emails.send({
            from:
                process.env.REPORT_FROM_EMAIL ??
                "Jibonchokro Reports <onboarding@resend.dev>",
            to: REPORT_RECIPIENT,
            replyTo: reporterEmail || undefined,
            subject: `রিপোর্ট: ${postTitle ?? postId}`,
            text: [
                `পোস্ট: ${postTitle ?? "N/A"}`,
                `লিংক: ${postUrl}`,
                `পোস্ট আইডি: ${postId}`,
                `কারণ: ${reasonLabel}`,
                `বিবরণ:\n${description.trim()}`,
                `রিপোর্টকারীর ইমেইল: ${reporterEmail || "প্রদান করা হয়নি"
                }`,
            ].join("\n\n"),
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                {
                    error: "Failed to send report.",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}