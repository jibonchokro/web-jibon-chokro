"use client";

import Image from "next/image";
import Link from "next/link";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/post";

interface FeaturedCarouselProps {
    posts: Post[];
}

export default function FeaturedCarousel({
    posts,
}: FeaturedCarouselProps) {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="font-bold text-gray-900">
                    নির্বাচিত লেখা
                </h2>
            </div>

            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop={posts.length > 1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {posts.map((post) => {
                    const image =
                        post.coverImage &&
                        urlFor(post.coverImage)
                            .width(600)
                            .height(350)
                            .url();

                    return (
                        <SwiperSlide key={post._id}>
                            <Link
                                href={`/posts/${post.slug.current}`}
                                className="block"
                            >
                                {image && (
                                    <div className="relative aspect-[16/9]">
                                        <Image
                                            src={image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-5">
                                    <p className="mb-2 text-sm font-medium text-green-700">
                                        {post.category?.title}
                                    </p>

                                    <h3 className="line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition hover:text-green-700">
                                        {post.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                        <span>
                                            {post.readingTime} মিনিট
                                        </span>

                                        <span>
                                            {new Date(
                                                post.publishedAt
                                            ).toLocaleDateString("bn-BD")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}