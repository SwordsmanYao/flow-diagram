import * as React from "react";
import { Dispatch } from "../../hooks";

export const initial: Dispatch = () => {};

export const DispatchContext = React.createContext<Dispatch>(initial);
