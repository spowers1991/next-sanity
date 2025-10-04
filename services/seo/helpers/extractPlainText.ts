import { PortableTextBlock } from "sanity";

export function extractPlainText(blocks?: PortableTextBlock[]): string | null {
  if (!blocks) return null;

  for (const block of blocks) {
    if (block._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child._type === "span" && typeof child.text === "string") {
          return child.text;
        }
      }
    }
  }

  return null;
}
