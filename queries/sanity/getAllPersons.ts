export const ALL_PERSONS_QUERY = `*[_type == "person" && defined(slug.current)]
  | order(releaseDate desc)[0...12]{
    _id,
    _type,
    name,
    slug,
}`
