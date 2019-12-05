import { useContext } from "react";
import { FlowContext } from "./FlowContext";
import { PortReference } from "../../interfaces";

export const useReferencePort = (refPort: PortReference) => {
  const flow = useContext(FlowContext);
  const node = flow.nodes?.[refPort.nodeId];
  const port = node && node.ports[refPort.portId];
  return node && port && {
    ...port,
    absolutePosition: {
      x: node.position.x + port.position.x,
      y: node.position.y + port.position.y,
    }
  };
};