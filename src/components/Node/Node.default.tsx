import * as React from "react";
import { Node } from "../../interfaces";
import { DefaultPort } from "../Port";

interface Props {
  node: Node;
}

export const DefaultNode: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  return (
    <div
      style={{
        left: node.position.x,
        top: node.position.y,
        width: 200,
        height: 50,
        border: "1px solid #40b0ff",
        position: "absolute"
      }}
      onClick={() => console.log("node")}
    >
      {ports &&
        Object.keys(ports).map(key => <DefaultPort port={ports[key]} />)}
    </div>
  );
};
