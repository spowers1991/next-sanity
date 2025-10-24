import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

export default function Grid({ children }: GridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}
