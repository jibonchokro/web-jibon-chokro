import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostCard from "@/components/post/PostCard";

import {
    getCategoryBySlug,
} from "@/services/category.service";

import {
    getPostsByCategory,
} from "@/services/post.service";


interface Props {
    params: Promise<{
        slug: string;
    }>;
}



export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {

    const { slug } = await params;


    const category = await getCategoryBySlug(slug);


    if (!category) {
        return {
            title: "Category Not Found",
        };
    }


    return {
        title: category.title,
        description:
            category.description ??
            `${category.title} বিভাগের সকল লেখা`,
    };
}



export default async function CategoryPage({
    params,
}: Props) {

    const { slug } = await params;


    const category = await getCategoryBySlug(slug);


    if (!category) {
        notFound();
    }


    const posts = await getPostsByCategory(slug);



    return (

        <main className="mx-auto max-w-7xl px-4 py-16">


            <header className="mb-12">

                <h1 className="text-4xl font-bold">
                    {category.title}
                </h1>


                {category.description && (
                    <p className="mt-4 max-w-3xl text-lg text-gray-600">
                        {category.description}
                    </p>
                )}

            </header>



            {
                posts.length > 0 ? (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {
                            posts.map((post) => (

                                <PostCard
                                    key={post._id}
                                    post={post}
                                />

                            ))
                        }

                    </div>

                ) : (

                    <div className="rounded-xl border p-10 text-center text-gray-600">

                        এই বিভাগে এখনো কোনো লেখা প্রকাশিত হয়নি।

                    </div>

                )
            }


        </main>

    );
}