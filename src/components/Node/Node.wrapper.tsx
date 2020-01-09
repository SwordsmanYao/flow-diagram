import * as React from "react";
import { Node } from "../../interfaces";
import { PortWrapper } from "../Port";
import { useMove, useEventCallback, useDispatchContext } from "../../hooks";
import { useRef } from "react";
import { DefaultNode } from "./Node.default";
import { ComponentsContext, FlowContext } from "../Flow";

interface Props {
  node: Node;
}

export const NodeWrapper: React.FC<Props> = props => {
  const { node } = props;
  const { ports } = node;
  const nodeRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useDispatchContext();
  const { nodeComponents } = React.useContext(ComponentsContext);
  const { selected } = React.useContext(FlowContext);
  
  const isSelected = React.useMemo(() => {
    return selected?.id === node.id;
  }, [selected, node.id]);
  
  const Component = React.useMemo(() => node.type && nodeComponents?.[node.type] || DefaultNode, [nodeComponents, node.type, DefaultNode]);
  
  useMove({
    targetElementRef: nodeRef,
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

  const handleSelect = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch({
      type: "select",
      payload: {
        id: node.id,
        type: "node"
      }
    });
  }, [dispatch, node.id]);

  return (
    <div
      style={{
        left: node.position.x,
        top: node.position.y,
        position: "absolute"
      }}
      ref={nodeRef}
      onClick={handleSelect}
    >
      <Component node={node} selected={isSelected} />
      {ports &&
        Object.keys(ports).map(key => (
          <PortWrapper key={key} port={ports[key]} node={node} />
        ))}
    </div>
  );
};
