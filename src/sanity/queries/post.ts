import { groq } from "next-sanity";

export const allPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  coverImage,
  featured,
  readingTime,
  publishedAt,
  tags,

  category->{
    _id,
    title,
    slug
  }
}
`;


export const featuredPostsQuery = groq`
*[_type == "post" && featured == true]
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  featured,
  readingTime,
  publishedAt,

  category->{
    _id,
    title,
    slug
  }
}
`;


export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  content,
  coverImage,
  featured,
  readingTime,
  publishedAt,
  tags,

  category->{
    _id,
    title,
    slug
  }
}
`;

export const latestPostsQuery = groq`
*[_type == "post"]
| order(publishedAt desc)[0...5]{
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
`;

export const popularPostsQuery = groq`
*[_type == "post"]
| order(publishedAt desc)[0...5]{
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
`;

export const postsByCategoryQuery = groq`
*[
  _type == "post" &&
  category->slug.current == $slug
]
| order(publishedAt desc){

  _id,
  title,
  slug,
  excerpt,
  coverImage,
  featured,
  readingTime,
  publishedAt,
  tags,

  category->{
    _id,
    title,
    slug
  }

}
`;