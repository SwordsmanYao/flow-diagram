import * as React from "react";
import { Node } from "../../interfaces";

export interface DefaultNodeProps {
  node: Node;
}

export const DefaultNode: React.FC<DefaultNodeProps> = props => {
  const { node } = props;
  return (
    <div
      style={{
        border: "1px solid #40b0ff",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        boxShadow:
          "0px 4px 4px 0px rgba(0,0,0,0.12),0px 0px 4px 0px rgba(0,0,0,0.04)"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "#40b0ff",
          opacity: 0.3
        }}
      ></div>
      <div
        style={{
          width: 200,
          height: 50,
          textAlign: "center",
          color: "#40b0ff",
          lineHeight: "50px"
        }}
      >{node.properties?.name}</div>
    </div>
  );
};
