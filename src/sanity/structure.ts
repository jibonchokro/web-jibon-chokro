import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("content")
    .title("Content")
    .items([
      S.documentTypeListItem("post")
        .id("posts")
        .title("Posts"),

      S.documentTypeListItem("category")
        .id("categories")
        .title("Categories"),
    ]);