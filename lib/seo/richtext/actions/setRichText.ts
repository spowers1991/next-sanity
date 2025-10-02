import type { Movie } from "@/services/sanity/movie/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

type JsonLd = Record<string, unknown>;

/**
 * Create JSON-LD structured data for a given post (Movie for now).
 */
export function setRichText(post: Movie | null, pageUrl: string): JsonLd | null {
  if (!post) return null;

  // Use overview text directly if available, otherwise fallback
  const description =
    (post?.overview?.[0]?.children?.[0]?.text as string) ||
    "Check out this content!";

  const imageUrl = post.poster ? urlForImage(post.poster).url() : undefined;

  const schemaType = post._type === "movie" ? "Movie" : "Post";

  const jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: post.title ?? "Not Found",
    description,
    url: pageUrl,
  };

  if (imageUrl) {
    jsonLd["image"] = imageUrl;
  }

  if ((post as Movie & { releaseDate?: string }).releaseDate) {
    jsonLd["datePublished"] = (post as Movie & { releaseDate?: string }).releaseDate;
  }

  if ((post as Movie & { author?: { name: string } }).author) {
    jsonLd["author"] = {
      "@type": "Person",
      name: (post as Movie & { author?: { name: string } }).author?.name,
    };
  }

  return jsonLd;
}
