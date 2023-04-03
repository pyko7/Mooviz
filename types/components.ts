import { ReactNode } from "react";

export enum ListType {
  Image = "image",
  Text = "text",
}

export interface HorizontalScrollingList {
  children: ReactNode;
  scroll: number;
  type: ListType.Image | ListType.Text;
}

export interface Skeleton {
  width: number | string;
  height: number | string;
  light?: boolean;
}

export interface ListSkeleton {
  length: number;
  children: ReactNode;
  vertical?: boolean;
  centered?: boolean;
  wrap?: boolean;
}
