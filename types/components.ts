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
