import { Transform } from "./generics";
import { RefObject } from "react";

export type Canvas = Transform & {
  ref: RefObject<HTMLElement>;
};
