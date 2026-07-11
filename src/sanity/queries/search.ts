import { defineQuery } from "next-sanity";

export const searchPostsQuery = defineQuery(`
*[
  _type == "post" &&
  (
    title match $search ||
    excerpt match $search ||
    tags[] match $search
  )
]
| order(publishedAt desc)[0...8]{
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
}
`);