export const ALL_MOVIES_QUERY = `*[_type == "movie" && defined(slug.current)]
  | order(releaseDate desc)[0...12]{
    _id,
    _type,
    title,
    slug,
    releaseDate,
    overview,
    poster,
    popularity
}`
