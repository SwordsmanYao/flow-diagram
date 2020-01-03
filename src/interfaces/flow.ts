import { Position } from "./generics";

export interface Flow {
  nodes: {
    [id: string]: Node;
  };
  links: {
    [id: string]: Link;
  };
  /** 正在连线的linkId */
  linkingId?: string;
  /** 选中的节点或连线 */
  selected?: {
    id: string;
    type: "node" | "link";
  };
}

export interface Node<T = any> {
  id: string;
  type?: string;
  position: Position;
  ports: {
    [id: string]: Port;
  };
  properties?: T;
}

export interface Port {
  id: string;
  type?: string;
  position: Position;
}

export interface Link {
  id: string;
  type?: string;
  from: PortReference | Position;
  to: PortReference | Position;
}

export interface PortReference {
  nodeId: string;
  portId: string;
}
