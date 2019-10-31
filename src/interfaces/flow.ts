import { Position } from './generics';

export interface Flow {
  position: Position;
  nodes: {
    [id: string]: Node,
  }
  links: {
    [id: string]: Link,
  }
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  ports: {
    [id: string]: Port;
  };
}

export interface Link {
  id: string;
  type: string;
  from: {
    nodeId: string;
    portId: string;
  },
  to: {
    nodeId: string;
    portId: string;
  }
}

export interface Port {
  id: string;
  type: string;
  position: Position;
}