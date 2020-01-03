import * as React from "react";
import { DefaultNodeProps } from "../Node";
import { DefaultLinkProps } from "../Link";
import { DefaultPortProps } from "../Port";

interface ComponentMap<P> {
  [type: string]: React.ComponentType<P>;
}

export interface CustomComponents {
  nodeComponents?: ComponentMap<DefaultNodeProps>;
  linkComponents?: ComponentMap<DefaultLinkProps>;
  portComponents?: ComponentMap<DefaultPortProps>;
}

export const initialComponents: CustomComponents = {};

export const ComponentsContext = React.createContext<CustomComponents>(
  initialComponents
);
