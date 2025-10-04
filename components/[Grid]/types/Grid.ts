export interface Grid {
  children: React.ReactNode;
  columnsClassName: string;
  colsMobile?: number;    // default 1
  colsSm?: number;        // default 2
  colsMd?: number;        // default 3
  colsLg?: number;        // default 4
  colsXl?: number;        // optional
  className?: string;
}