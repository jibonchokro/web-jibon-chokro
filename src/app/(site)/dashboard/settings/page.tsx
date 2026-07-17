import {
    Bell,
    Download,
    Eye,
    Laptop,
    Mail,
    Monitor,
    Moon,
    Shield,
    Trash2,
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    সেটিংস
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                    আপনার অ্যাকাউন্ট, ব্যক্তিগত পছন্দ এবং নিরাপত্তা
                    সংক্রান্ত সেটিংস পরিচালনা করুন।
                </p>
            </div>

            {/* Account */}

            <section className="rounded-xl border border-black/10 bg-card">
                <div className="border-b border-black/10 px-6 py-4">
                    <h2 className="font-semibold tracking-tight">
                        অ্যাকাউন্ট
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার লগইন ও পরিচয় সম্পর্কিত তথ্য।
                    </p>
                </div>

                <div className="divide-y divide-black/10">
                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg border border-black/10 bg-muted p-2">
                                <Mail size={18} />
                            </div>

                            <div>
                                <p className="font-medium">
                                    ইমেইল
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Google Account
                                </p>
                            </div>
                        </div>

                        <button
                            disabled
                            className="rounded-lg border border-black/10 bg-muted px-4 py-2 text-sm text-muted-foreground"
                        >
                            পরিবর্তন করা যাবে না
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg border border-black/10 bg-muted p-2">
                                <Shield size={18} />
                            </div>

                            <div>
                                <p className="font-medium">
                                    লগইন পদ্ধতি
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Google OAuth
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            Connected
                        </span>
                    </div>
                </div>
            </section>

            {/* Appearance */}

            <section className="rounded-xl border border-black/10 bg-card">
                <div className="border-b border-black/10 px-6 py-4">
                    <h2 className="font-semibold tracking-tight">
                        Appearance
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার পছন্দ অনুযায়ী থিম নির্বাচন করুন।
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 p-6">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white">
                        <Laptop size={16} />
                        Light
                    </button>

                    <button
                        disabled
                        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-muted px-4 py-2 text-sm text-muted-foreground"
                    >
                        <Moon size={16} />
                        Dark
                    </button>

                    <button
                        disabled
                        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-muted px-4 py-2 text-sm text-muted-foreground"
                    >
                        <Monitor size={16} />
                        System
                    </button>
                </div>
            </section>

            {/* Notifications */}

            <section className="rounded-xl border border-black/10 bg-card">
                <div className="border-b border-black/10 px-6 py-4">
                    <h2 className="font-semibold tracking-tight">
                        Notifications
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        কোন নোটিফিকেশনগুলো পেতে চান।
                    </p>
                </div>

                <div className="divide-y divide-black/10">
                    {[
                        "নতুন পোস্টের নোটিফিকেশন",
                        "মন্তব্যের রিপ্লাই",
                        "গুরুত্বপূর্ণ ঘোষণা",
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex items-center justify-between p-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-black/10 bg-muted p-2">
                                    <Bell size={16} />
                                </div>

                                <span>{item}</span>
                            </div>

                            <input
                                type="checkbox"
                                disabled
                            />
                        </label>
                    ))}
                </div>
            </section>

            {/* Privacy */}

            <section className="rounded-xl border border-black/10 bg-card">
                <div className="border-b border-black/10 px-6 py-4">
                    <h2 className="font-semibold tracking-tight">
                        Privacy
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার ব্যক্তিগত তথ্য ও দৃশ্যমানতা নিয়ন্ত্রণ করুন।
                    </p>
                </div>

                <div className="divide-y divide-black/10">
                    {[
                        "পাবলিক প্রোফাইল",
                        "আমার কার্যক্রম দেখানো হবে",
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex items-center justify-between p-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-black/10 bg-muted p-2">
                                    <Eye size={16} />
                                </div>

                                <span>{item}</span>
                            </div>

                            <input
                                type="checkbox"
                                disabled
                            />
                        </label>
                    ))}
                </div>
            </section>

            {/* Connected Account */}

            <section className="rounded-xl border border-black/10 bg-card">
                <div className="border-b border-black/10 px-6 py-4">
                    <h2 className="font-semibold tracking-tight">
                        Connected Account
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        বর্তমানে সংযুক্ত পরিষেবাসমূহ।
                    </p>
                </div>

                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-medium">
                            Google
                        </p>

                        <p className="text-sm text-muted-foreground">
                            আপনার Google Account সংযুক্ত আছে।
                        </p>
                    </div>

                    <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        Connected
                    </span>
                </div>
            </section>

            {/* Danger Zone */}

            <section className="rounded-xl border border-red-200 bg-red-50/50">
                <div className="border-b border-red-200 px-6 py-4">
                    <h2 className="font-semibold text-red-700">
                        Danger Zone
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        এই অপশনগুলো ভবিষ্যতে চালু হবে। সতর্কতার সাথে ব্যবহার করুন।
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 p-6">
                    <button
                        disabled
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white opacity-60"
                    >
                        <Trash2 size={16} />
                        Delete Account
                    </button>

                    <button
                        disabled
                        className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm text-red-700 opacity-60"
                    >
                        <Download size={16} />
                        Download My Data
                    </button>
                </div>
            </section>
        </div>
    );
}