// sanity/queries/getCurrentPost.ts
export const POST_QUERY = `*[_type == "person" && slug.current == $slug][0]{
  ...
}`;
