import * as React from "react";
import { Node } from "../../interfaces";
import { PortWrapper } from "../Port";
import { useMove, useEventCallback, useDispatchContext } from "../../hooks";
import { useRef } from "react";
import { DefaultNode } from "./Node.default";
import { ComponentsContext } from "../Flow";

interface Props {
  node: Node;
}

export const NodeWrapper: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  const nodeRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useDispatchContext();
  const { nodeComponents } = React.useContext(ComponentsContext);

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

  const Component = React.useMemo(() => node.type && nodeComponents?.[node.type] || DefaultNode, [nodeComponents, node.type, DefaultNode]);

  return (
    <div
      style={{
        left: node.position.x,
        top: node.position.y,
        position: "absolute"
      }}
      ref={nodeRef}
    >
      <Component node={node} />
      {ports &&
        Object.keys(ports).map(key => (
          <PortWrapper key={key} port={ports[key]} node={node} />
        ))}
    </div>
  );
};
