import * as React from "react";
import { Node } from "../../interfaces";
import { DefaultPort } from "../Port";
import { usePosition, useEventCallback } from "../../hooks";
import { useRef, useContext } from "react";
import { DispatchContext } from "../Flow";

interface Props {
  node: Node;
}

export const DefaultNode: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useContext(DispatchContext);
  usePosition({
    targetElementRef: nodeRef,
    onMove: useEventCallback(position => {
      if (nodeRef.current) {
        dispatch({
          type: "moveNode",
          payload: {
            id: node.id,
            position
          }
        });
      }
    }, [])
  });
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
      ref={nodeRef}
    >
      {ports &&
        Object.keys(ports).map(key => (
          <DefaultPort key={key} port={ports[key]} node={node} />
        ))}
    </div>
  );
};
