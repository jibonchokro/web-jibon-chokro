import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function errorResponse(error: unknown) {
    console.error("Bookmarks API Error:", error);

    return NextResponse.json(
        {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : JSON.stringify(error),
        },
        {
            status: 500,
        }
    );
}


export async function GET(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        console.log("Bookmark user:", user?.id);
        console.log("Auth error:", error);

        if (error) {
            throw error;
        }

        if (!user) {
            return NextResponse.json({
                authenticated: false,
                bookmarked: false,
            });
        }


        const postId = new URL(request.url)
            .searchParams
            .get("postId");


        if (!postId) {
            const { data, error } = await supabase
                .from("bookmarks")
                .select("post_id")
                .eq("user_id", user.id)
                .order("created_at", {
                    ascending: false,
                });


            if (error) {
                throw error;
            }


            return NextResponse.json({
                authenticated: true,
                bookmarks:
                    data?.map(
                        (item) => item.post_id
                    ) ?? [],
            });
        }


        const { data, error: bookmarkError } =
            await supabase
                .from("bookmarks")
                .select("id")
                .eq("user_id", user.id)
                .eq("post_id", postId)
                .maybeSingle();


        if (bookmarkError) {
            throw bookmarkError;
        }


        return NextResponse.json({
            authenticated: true,
            bookmarked: Boolean(data),
        });


    } catch (error) {
        return errorResponse(error);
    }
}



export async function POST(request: Request) {

    try {

        const supabase = await createClient();


        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();


        console.log("POST user:", user?.id);
        console.log("POST auth error:", error);


        if (error) {
            throw error;
        }


        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }


        const body = await request.json();

        const postId = body.postId;


        if (!postId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "postId missing",
                },
                {
                    status: 400,
                }
            );
        }



        const { error: insertError } =
            await supabase
                .from("bookmarks")
                .insert({
                    user_id: user.id,
                    post_id: postId,
                });



        if (insertError) {

            if (
                insertError.code === "23505"
            ) {
                return NextResponse.json({
                    success: true,
                    bookmarked: true,
                });
            }

            throw insertError;
        }



        return NextResponse.json({
            success: true,
            bookmarked: true,
        });



    } catch (error) {

        return errorResponse(error);

    }

}





export async function DELETE(request: Request) {

    try {

        const supabase = await createClient();


        const {
            data: { user },
            error,
        } =
            await supabase.auth.getUser();


        if (error) {
            throw error;
        }


        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );

        }


        const { postId } = await request.json();



        const { error: deleteError } = await supabase
            .from("bookmarks")
            .delete()
            .eq(
                "user_id",
                user.id
            )
            .eq(
                "post_id",
                postId
            );


        if (deleteError) {
            throw deleteError;
        }



        return NextResponse.json({
            success: true,
            bookmarked: false,
        });


    } catch (error) {

        return errorResponse(error);

    }

}