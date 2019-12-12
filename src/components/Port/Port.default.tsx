/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Port, Node } from "../../interfaces";
import { usePosition, useEventCallback } from "../../hooks";
import { useRef, useContext } from "react";
import { DispatchContext, FlowContext } from "../Flow";
import * as uuid from "uuid/v4";

interface Props {
  port: Port;
  node: Node;
}

export const DefaultPort: React.FC<Props> = props => {
  const { port, node } = props;
  const width = 6;
  const height = 6;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useContext(DispatchContext);
  const { linkingId, links } = useContext(FlowContext);

  usePosition({
    targetElementRef: ref,
    onMouseDown: useEventCallback(() => {
      const id = uuid();
      dispatch({
        type: "linkStart",
        payload: {
          id: id,
          type: "default",
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
    }, [node, port]),
    onMove: useEventCallback(
      position => {
        if (linkingId) {
          dispatch({
            type: "linkMove",
            payload: {
              linkId: linkingId,
              to: {
                x: position.x + width / 2,
                y: position.y + height / 2
              }
            }
          });
        }
      },
      [linkingId]
    )
  });

  const handleMouseUp = () => {
    if (linkingId && "x" in links[linkingId].to) {
      dispatch({
        type: "linkEnd",
        payload: {
          linkId: linkingId,
          to: {
            nodeId: node.id,
            portId: port.id
          }
        }
      });
    }
  };

  return (
    <div
      ref={ref}
      css={css`
        width: ${width}px;
        height: ${height}px;
        background: red;
        display: inline-block;
        position: absolute;
        left: ${port.position.x - width / 2}px;
        top: ${port.position.y - height / 2}px;
      `}
      onMouseUp={handleMouseUp}
    ></div>
  );
};
