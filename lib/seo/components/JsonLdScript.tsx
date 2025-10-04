// components/SEO/JsonLdScript.tsx
interface JsonLdScriptProps {
  json: unknown;
}

export default function JsonLdScript({ json }: JsonLdScriptProps) {
  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
