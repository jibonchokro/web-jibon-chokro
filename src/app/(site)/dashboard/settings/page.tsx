export default function SettingsPage() {
    return (
        <div className="space-y-8">

            {/* Header */}

            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    সেটিংস
                </h1>

                <p className="mt-2 text-gray-600">
                    আপনার অ্যাকাউন্ট এবং ব্যক্তিগত পছন্দসমূহ পরিচালনা করুন।
                </p>
            </div>

            {/* Account */}

            <section className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                <h2 className="text-xl font-semibold">
                    অ্যাকাউন্ট
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    আপনার অ্যাকাউন্ট সম্পর্কিত তথ্য।
                </p>

                <div className="mt-6 space-y-5">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">
                                ইমেইল
                            </p>

                            <p className="text-sm text-gray-500">
                                Google Account
                            </p>
                        </div>

                        <button
                            disabled
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-400"
                        >
                            পরিবর্তন করা যাবে না
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">
                                লগইন পদ্ধতি
                            </p>

                            <p className="text-sm text-gray-500">
                                Google OAuth
                            </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Connected
                        </span>
                    </div>

                </div>

            </section>

            {/* Appearance */}

            <section className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                <h2 className="text-xl font-semibold">
                    Appearance
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    ওয়েবসাইটের থিম নির্বাচন করুন।
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                    <button className="rounded-lg border border-green-700 bg-green-700 px-5 py-2 text-white">
                        Light
                    </button>

                    <button
                        disabled
                        className="rounded-lg border border-gray-300 px-5 py-2 text-gray-400"
                    >
                        Dark (Coming Soon)
                    </button>

                    <button
                        disabled
                        className="rounded-lg border border-gray-300 px-5 py-2 text-gray-400"
                    >
                        System (Coming Soon)
                    </button>

                </div>

            </section>

            {/* Notifications */}

            <section className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                <h2 className="text-xl font-semibold">
                    নোটিফিকেশন
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    কোন কোন নোটিফিকেশন পেতে চান তা নির্বাচন করুন।
                </p>

                <div className="mt-6 space-y-4">

                    <label className="flex items-center justify-between">

                        <span>
                            নতুন পোস্টের নোটিফিকেশন
                        </span>

                        <input
                            type="checkbox"
                            disabled
                        />

                    </label>

                    <label className="flex items-center justify-between">

                        <span>
                            মন্তব্যের রিপ্লাই
                        </span>

                        <input
                            type="checkbox"
                            disabled
                        />

                    </label>

                    <label className="flex items-center justify-between">

                        <span>
                            গুরুত্বপূর্ণ ঘোষণা
                        </span>

                        <input
                            type="checkbox"
                            disabled
                        />

                    </label>

                </div>

            </section>

            {/* Privacy */}

            <section className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                <h2 className="text-xl font-semibold">
                    Privacy
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    আপনার প্রোফাইল এবং ব্যক্তিগত তথ্য নিয়ন্ত্রণ করুন।
                </p>

                <div className="mt-6 space-y-4">

                    <label className="flex items-center justify-between">

                        <span>
                            পাবলিক প্রোফাইল
                        </span>

                        <input
                            type="checkbox"
                            disabled
                        />

                    </label>

                    <label className="flex items-center justify-between">

                        <span>
                            আমার কার্যক্রম দেখানো হবে
                        </span>

                        <input
                            type="checkbox"
                            disabled
                        />

                    </label>

                </div>

            </section>

            {/* Connected Accounts */}

            <section className="rounded-2xl border border-[#e7e7e7] bg-white p-6">

                <h2 className="text-xl font-semibold">
                    Connected Account
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    বর্তমানে সংযুক্ত অ্যাকাউন্ট।
                </p>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 p-4">

                    <div>
                        <p className="font-medium">
                            Google
                        </p>

                        <p className="text-sm text-gray-500">
                            আপনার Google Account সংযুক্ত আছে।
                        </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Connected
                    </span>

                </div>

            </section>

            {/* Danger Zone */}

            <section className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h2 className="text-xl font-semibold text-red-700">
                    Danger Zone
                </h2>

                <p className="mt-2 text-sm text-red-600">
                    এই কাজগুলো করলে তা সহজে ফিরিয়ে আনা যাবে না।
                </p>

                <div className="mt-6 flex flex-wrap gap-4">

                    <button
                        disabled
                        className="rounded-lg bg-red-600 px-5 py-2 text-white opacity-60"
                    >
                        Delete Account
                    </button>

                    <button
                        disabled
                        className="rounded-lg border border-red-300 px-5 py-2 text-red-700 opacity-60"
                    >
                        Download My Data
                    </button>

                </div>

            </section>

        </div>
    );
}