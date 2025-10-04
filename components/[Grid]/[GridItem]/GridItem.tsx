import Link from "next/link";

interface GridItemProps {
  title: string;
  slug: string;
  hrefPrefix?: string; // Optional prefix for href, e.g. "/movies"
  className?: string;
}

export default function GridItem({ title, slug, hrefPrefix = "", className = "" }: GridItemProps) {
  return (
    <Link
      href={`${hrefPrefix}/${slug}`}
      className={`block rounded-lg border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition ${className}`}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </Link>
  );
}
