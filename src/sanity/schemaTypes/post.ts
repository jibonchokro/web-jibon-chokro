import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Posts",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 120,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.max(250),
        }),

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                },

                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                        }),

                        defineField({
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "string",
                },
            ],
        }),

        defineField({
            name: "featured",
            title: "Featured",
            type: "boolean",
            initialValue: false,
        }),

        defineField({
            name: "readingTime",
            title: "Reading Time (minutes)",
            type: "number",
            description: "Estimated reading time in minutes.",
            initialValue: 3,
            validation: (Rule) =>
                Rule.required().integer().min(1).max(120),
        }),

        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            validation: (Rule) => Rule.max(60),
        }),

        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(160),
        }),

        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "category.title",
            media: "coverImage",
        },
    },
});