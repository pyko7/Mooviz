import { ReactNode } from "react";

export type ChildrenProps = { children?: ReactNode };

export interface ThemeContextInterface {
  theme: string;
  setTheme: (theme: string) => void;
}
