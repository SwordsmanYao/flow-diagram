import * as React from "react";
import { Node } from "../../interfaces";
import { DefaultPort } from "../Port";
import { useMove, useEventCallback, useDispatchContext } from "../../hooks";
import { useRef } from "react";

interface Props {
  node: Node;
}

export const DefaultNode: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  const nodeRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useDispatchContext();
  useMove({
    targetElementRef: nodeRef,
    onMouseDown: useEventCallback(() => {
      dispatch({
        type: "select",
        payload: {
          id: node.id,
          type: "node"
        }
      });
    }, [dispatch, node.id]),
    onMove: useEventCallback(
      position => {
        if (nodeRef.current) {
          dispatch({
            type: "moveNode",
            payload: {
              id: node.id,
              position
            }
          });
        }
      },
      [dispatch, node.id]
    )
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
      ref={nodeRef}
    >
      {ports &&
        Object.keys(ports).map(key => (
          <DefaultPort key={key} port={ports[key]} node={node} />
        ))}
    </div>
  );
};
