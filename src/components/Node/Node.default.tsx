import * as React from "react";
import { Node } from "../../interfaces";
import { DefaultPort } from "../Port";
import { usePosition } from "../../hooks";
import { CanvasContext } from "../Canvas";
import { useRef, useContext } from "react";
import { DispatchContext } from "../Flow";

interface Props {
  node: Node;
}

export const DefaultNode: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  const nodeRef = useRef<HTMLDivElement>(null);
  const canvas = useContext(CanvasContext);
  const dispatch = useContext(DispatchContext);
  usePosition({
    zoom: canvas.zoom,
    targetElementRef: nodeRef,
    relativeElementRef: canvas.ref,
    onChange: position => {
      if (nodeRef.current) {
        dispatch({
          type: "moveNode",
          payload: {
            ...node,
            position
          }
        });
        nodeRef.current.style.left = `${position.x}px`;
        nodeRef.current.style.top = `${position.y}px`;
      }
    }
  });
  return (
    <div
      style={{
        left: node.position.x,
        top: node.position.y,
        position: "absolute"
      }}
      onClick={() => console.log("node")}
      ref={nodeRef}
    >
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
        >
          Node
        </div>
      </div>
      {ports &&
        Object.keys(ports).map(key => (
          <DefaultPort key={key} port={ports[key]} />
        ))}
    </div>
  );
};
