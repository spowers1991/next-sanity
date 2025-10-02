import type { Movie } from "@/services/sanity/movie/types/Movie";
import { urlForImage } from "@/lib/sanity/helpers/image";

export function setRichText(post: Movie | null, pageUrl: string) {
  if (!post) return null;

  const description =
    (post?.overview?.[0]?.children?.[0]?.text as string) ||
    "Check out this content!";

  const imageUrl = post.poster ? urlForImage(post.poster).url() : undefined;

  const schemaType = post._type === "movie" ? "Movie" : "Post";

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: post.title ?? "Not Found",
    description,
    url: pageUrl,
  };

  if (imageUrl) {
    jsonLd["image"] = imageUrl;
  }

  if ((post as any).releaseDate) {
    jsonLd["datePublished"] = (post as any).releaseDate;
  }

  if ((post as any).author) {
    jsonLd["author"] = {
      "@type": "Person",
      name: (post as any).author?.name,
    };
  }

  return jsonLd;
}
