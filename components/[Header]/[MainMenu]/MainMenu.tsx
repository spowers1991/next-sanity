"use client"

import { useMovies } from "@/services/sanity/movies/state/MoviesContext";
import MenuItem from './[MenuItem]/MenuItem'

export default function MainMenu() {

  const { movies } = useMovies();

  const items = movies;

  return (
    <div className="flex w-full py-3 px-3">
      <ul className="ml-auto flex gap-2">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
}
