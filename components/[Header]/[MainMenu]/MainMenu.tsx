import { getMovies } from "@/services/sanity/movie/queries/getMovies";
import MenuItem from './[MenuItem]/MenuItem'

export default async function MainMenu() {

  const [items] = await Promise.all([getMovies()]);

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
