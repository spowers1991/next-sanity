import type { PortableTextBlock } from "sanity";

export interface StructuredContentBase {
  _type: string;
  title?: string;
  overview?: (PortableTextBlock & { _key?: string })[]; // ← allow _key to be optional
  poster?: unknown;
}
