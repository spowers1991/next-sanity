import type { Grid } from "./types/Grid";

export default function Grid({
  children,
  columnsClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  className = "",
}: Grid) {
  return (
    <div className={`grid gap-6 p-4 ${columnsClassName} ${className}`}>
      {children}
    </div>
  );
}
