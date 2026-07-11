import { groq } from "next-sanity";


export const categoriesQuery = groq`
*[_type == "category"] | order(title asc){
  _id,
  title,
  slug,
  description
}
`;


export const categoryBySlugQuery = groq`
*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description
}
`;