/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Link, Position } from "../../interfaces";
import { useLinkPointPosition, useDispatchContext, useMove, useEventCallback } from "../../hooks";
import { DefaultLink } from "./Link.default";
import { ComponentsContext, FlowContext } from "../Flow";
import { useRef, useContext } from "react";

interface Props {
  link: Link;
}

interface PointProps {
  to: Position;
  link: Link;
}

const Point: React.FC<PointProps> = props => {
  const { to, link } = props;
  const { dispatch } = useDispatchContext();
  const pointRef = useRef<SVGCircleElement>(null);
  const { linkingId, links } = useContext(FlowContext);
  useMove({
    targetElementRef: pointRef,
    correctOffset: true,
    onMouseDown: useEventCallback(() => {
      dispatch({
        type: "linkContinue",
        payload: {
          id: link.id
        }
      });
    }, [dispatch]),
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
          }
        });
        dispatch({
          type: "clearLinkingId",
          payload: {}
        });
      }
    }, [linkingId, linkingId && links[linkingId], dispatch])
  });
  return (
    <circle ref={pointRef} cx={to.x} cy={to.y} r="3"  css={css`
      ${!linkingId && 'cursor: crosshair;'}
      opacity: 0;
    `} />
  );
};

export const LinkWrapper: React.FC<Props> = props => {
  const { link } = props;
  const from = useLinkPointPosition(link.from);
  const to = useLinkPointPosition(link.to);
  const { linkComponents } = React.useContext(ComponentsContext);
  const { dispatch } = useDispatchContext();
  

  const Component = React.useMemo(() => link.type && linkComponents?.[link.type] || DefaultLink, [linkComponents, link.type, DefaultLink]);

  const handleClick = () => {
    dispatch({
      type: "select",
      payload: {
        id: link.id,
        type: "link",
      },
    });
  };

  return (
    <g onClick={handleClick}>
      <Component from={from} to={to} link={link} />
      {'x' in link.to && <Point to={to} link={link} />}
    </g>
  );
};
