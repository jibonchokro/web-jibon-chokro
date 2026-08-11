import { defineQuery } from "next-sanity";

/*
 * All search queries share the same match + optional category
 * filter:
 *
 *   title/excerpt/tags match $search
 *   AND (no categorySlug given OR post's category matches it)
 *
 * $categorySlug is passed as `null` when no category filter is
 * active, and `defined()` is false for null in GROQ.
 */

const MATCH_FILTER = `
  _type == "post" &&
  (
    title match $search ||
    excerpt match $search ||
    tags[] match $search
  ) &&
  (
    !defined($categorySlug) ||
    category->slug.current == $categorySlug
  )
`;

const PROJECTION = `{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  readingTime,
  publishedAt,

  category->{
    _id,
    title,
    slug
  }
}`;

/*
 * Paginated, sorted inside Sanity. Used for "latest", "oldest",
 * and "title" — all fields Sanity actually has and can order by.
 */

export const searchPostsLatestQuery = defineQuery(`
*[${MATCH_FILTER}]
| order(publishedAt desc)[$start...$end]
${PROJECTION}
`);

export const searchPostsOldestQuery = defineQuery(`
*[${MATCH_FILTER}]
| order(publishedAt asc)[$start...$end]
${PROJECTION}
`);

export const searchPostsTitleQuery = defineQuery(`
*[${MATCH_FILTER}]
| order(title asc)[$start...$end]
${PROJECTION}
`);

/*
 * Unpaginated — used ONLY for "popular" sort.
 *
 * Popularity depends on views/comments, which live in Supabase, not
 * Sanity. Sanity can't order by a field it doesn't have, so instead
 * of slicing here, this returns every match; search.service.ts
 * attaches stats, sorts by popularity, and slices the page itself.
 */

export const searchPostsAllQuery = defineQuery(`
*[${MATCH_FILTER}]
| order(publishedAt desc)
${PROJECTION}
`);