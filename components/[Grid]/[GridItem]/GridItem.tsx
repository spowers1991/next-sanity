import Link from "next/link";

interface GridItemProps {
  label: string;
  slug: string;
}

export default function GridItem({ label, slug = "" }: GridItemProps) {
  return (
    <Link
      href={`${slug}`}
      className={`relative block border-2 border-[#ddd] p-4 transition hover:border-[#fff] duration-300 ease-in`}
    >
      <h2 className="text-lg font-semibold text-[#ddd] hover:text-white">
        {label}
      </h2>
    </Link>
  );
}
