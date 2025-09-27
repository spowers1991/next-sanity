import { sanityClient } from "@/lib/sanity/api/client";

type SlugObject = Record<string, { current?: string } | undefined>;

/**
 * Generate static params for a given Sanity type and slug fields.
 * 
 * @param type - The Sanity document type (e.g. "movie", "post")
 * @param slugFields - Array of field names that represent the dynamic route parts (e.g. ["category", "slug"])
 * @returns An array of route params objects for Next.js generateStaticParams
 */
export async function generateStaticParamsForType(
  type: string,
  slugFields: string[] = ["slug"]
): Promise<Record<string, string>[]> {
  const projection = slugFields.map((field) => `${field}`).join(", ");
  const query = `*[_type == "${type}"]{ ${projection} }`;

  const entries: SlugObject[] = await sanityClient.fetch(query);

  return entries.map((entry) => {
    const params: Record<string, string> = {};

    for (const field of slugFields) {
      const slugValue = entry[field]?.current;
      if (!slugValue) {
        throw new Error(`Missing slug field "${field}" in Sanity entry for type "${type}"`);
      }
      params[field] = slugValue;
    }

    return params;
  });
}
