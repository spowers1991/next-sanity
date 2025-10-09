// MovieInfo.tsx
import type { Movie } from "@/services/sanity/movies/types/Movie";
import type { PortableTextBlock } from "@portabletext/types";
import AnimatedText from "@/components/[TextReveal]/TextReveal";

export type MovieInfoProps = Pick<Movie, "title" | "releaseDate" | "popularity"> & {
  overview?: PortableTextBlock[];
};

export default function MovieInfo({ title, releaseDate, popularity }: MovieInfoProps) {
  return (
    <div className="md:col-span-2 space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        <AnimatedText text={title} />
      </h1>

      <div className="flex items-center gap-6 text-sm text-gray-400">
        {releaseDate && <span>📅 {new Date(releaseDate).toLocaleDateString()}</span>}
        {popularity && <span>🔥 Popularity: {popularity}</span>}
      </div>

      <p className="text-lg leading-relaxed text-gray-300"> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <button className="px-5 py-3 bg-red-600 hover:bg-red-700 transition rounded-xl shadow-lg text-white font-medium">
        Watch Trailer
      </button>
    </div>
  );
}
