import { Position } from './generics';

export interface Flow {
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

export interface Port {
  id: string;
  type: string;
  position: Position;
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
