import { useContext } from "react";
import { PortReference, Position } from "../interfaces";
import { FlowContext } from "../components/Flow";

export const useLinkPointPosition = (linkPoint: PortReference | Position): Position => {
  if ('x' in linkPoint) {
    return linkPoint;
  }
  const flow = useContext(FlowContext);
  const node = flow.nodes[linkPoint.nodeId];
  const port = node && node.ports[linkPoint.portId];
  return node && port && {
    x: node.position.x + port.position.x,
    y: node.position.y + port.position.y,
  };
};