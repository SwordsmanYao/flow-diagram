/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Port, Node } from "../../interfaces";
import { useMove, useEventCallback, useDispatchContext } from "../../hooks";
import { useRef, useContext } from "react";
import { FlowContext, ComponentsContext } from "../Flow";
import * as uuid from "uuid/v4";
import { DefaultPort } from "./Port.default";

interface Props {
  port: Port;
  node: Node;
}

export const PortWrapper: React.FC<Props> = props => {
  const { port, node } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useDispatchContext();
  const { linkingId, links } = useContext(FlowContext);
  const { portComponents } = React.useContext(ComponentsContext);

  useMove({
    targetElementRef: ref,
    correctOffset: true,
    onMouseDown: useEventCallback(() => {
      const id = uuid();
      dispatch({
        type: "linkStart",
        payload: {
          id: id,
          from: {
            nodeId: node.id,
            portId: port.id
          },
          to: {
            x: node.position.x + port.position.x,
            y: node.position.y + port.position.y
          }
        }
      });
    }, [node, port, dispatch]),
    onMove: useEventCallback(
      position => {
        if (linkingId) {
          dispatch({
            type: "linkMove",
            payload: {
              id: linkingId,
              to: {
                x: position.x,
                y: position.y
              }
            }
          });
        }
      },
      [linkingId, dispatch]
    ),
    onMouseUp: useEventCallback(() => {
      if (linkingId) {
        dispatch({
          type: "linkEnd",
          payload: {
            id: linkingId,
            to: links[linkingId].to
          }
        });
        dispatch({
          type: "clearLinkingId",
          payload: {}
        });
      }
    }, [linkingId, linkingId && links[linkingId], dispatch])
  });

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (linkingId && "x" in links[linkingId].to) {
      dispatch({
        type: "linkEnd",
        payload: {
          id: linkingId,
          to: {
            nodeId: node.id,
            portId: port.id
          }
        }
      });
      dispatch({
        type: "clearLinkingId",
        payload: {}
      });
    }
  };

  const Component = React.useMemo(() => port.type && portComponents?.[port.type] || DefaultPort, [portComponents, port.type, DefaultPort]);

  return (
    <div
      ref={ref}
      css={css`
        width: 0;
        height: 0;
        position: absolute;
        left: ${port.position.x}px;
        top: ${port.position.y}px;
      `}
      onMouseUp={handleMouseUp}
    >
      <Component port={port} node={node} />
    </div>
  );
};
