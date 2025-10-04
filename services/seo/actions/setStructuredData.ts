// services/seo/structured_data/setStructuredData.ts

import { urlForImage } from "@/lib/sanity/helpers/image";
import { buildGenericSchema } from "@/lib/seo/actions/buildGenericSchema";
import type { JsonLd } from "@/lib/seo/types/JsonLd";
import type { StructuredContentBase } from "@/services/seo/types/StructuredContentBase";
import { extractPlainText } from "@/services/seo/helpers/extractPlainText";

const TYPE_MAP: Record<string, string> = {
  movie: "Movie",
  blog: "BlogPosting",
  article: "Article",
};

export function setStructuredData(
  content: StructuredContentBase | null,
  pageUrl: string
): JsonLd | null {
  if (!content) return null;

  const description =
    extractPlainText(content.overview) ?? "Check out this content!";

  const imageUrl = content.poster
    ? urlForImage(content.poster).url()
    : undefined;

  const schemaType = TYPE_MAP[content._type] ?? "CreativeWork";

  return buildGenericSchema({
    type: schemaType,
    title: content.title ?? "Untitled",
    description,
    url: pageUrl,
    imageUrl,
  });
}
