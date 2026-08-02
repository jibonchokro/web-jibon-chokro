export interface CommentProfile {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
}

export interface Comment {
    id: string;

    post_id: string;

    user_id: string;

    parent_id: string | null;

    content: string;

    is_edited: boolean;

    is_deleted: boolean;

    created_at: string;

    updated_at: string;

    profiles: CommentProfile | null;
}