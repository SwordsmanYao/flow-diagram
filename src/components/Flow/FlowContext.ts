import * as React from "react";
import { Flow } from "../../interfaces";

export const initialFlow: Flow = {
  nodes: {},
  links: {}
};

export const FlowContext = React.createContext<Flow>(initialFlow);
