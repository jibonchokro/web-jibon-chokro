import { createClient } from "@/lib/supabase/server";
import {
    Calendar,
    Mail,
    ShieldCheck,
    User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const fullName =
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        "User";

    const avatar =
        user.user_metadata.avatar_url ?? null;

    const joinedDate = new Date(
        user.created_at
    ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    প্রোফাইল
                </h1>

                <p className="mt-2 text-gray-500">
                    আপনার ব্যক্তিগত তথ্য দেখুন ও ভবিষ্যতে এখান থেকে সম্পাদনা করুন।
                </p>
            </div>

            {/* Profile Card */}

            <div className="rounded-2xl border border-gray-200 bg-white p-8">

                <div className="flex flex-col items-center gap-6 md:flex-row">

                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={fullName}
                            width={120}
                            height={120}
                            className="rounded-3xl border border-gray-200 object-cover"
                        />
                    ) : (
                        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-3xl bg-green-700 text-5xl font-bold text-white">
                            {fullName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">

                        <h2 className="text-2xl font-bold">
                            {fullName}
                        </h2>

                        <p className="mt-1 text-gray-500">
                            {user.email}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">

                            <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                                Google Account
                            </span>

                            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                                Active
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Information */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <h3 className="mb-5 text-lg font-semibold">
                        Account Information
                    </h3>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <UserIcon className="text-green-700" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Full Name
                                </p>

                                <p className="font-medium">
                                    {fullName}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Mail className="text-green-700" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium break-all">
                                    {user.email}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Calendar className="text-green-700" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Joined
                                </p>

                                <p className="font-medium">
                                    {joinedDate}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <ShieldCheck className="text-green-700" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    User ID
                                </p>

                                <p className="break-all font-medium text-sm">
                                    {user.id}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <h3 className="mb-5 text-lg font-semibold">
                        Statistics
                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-gray-50 p-5 text-center">

                            <p className="text-3xl font-bold text-green-700">
                                0
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Bookmarks
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5 text-center">

                            <p className="text-3xl font-bold text-green-700">
                                0
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Likes
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5 text-center">

                            <p className="text-3xl font-bold text-green-700">
                                0
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Comments
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5 text-center">

                            <p className="text-3xl font-bold text-green-700">
                                0
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Followers
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}