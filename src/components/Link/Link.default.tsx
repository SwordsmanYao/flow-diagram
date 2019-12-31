import * as React from "react";
import { Link, Position } from "../../interfaces";
import { useLinkPointPosition } from "../../hooks";

interface Props {
  link: Link;
}

export const DefaultLink: React.FC<Props> = props => {
  const { link } = props;
  const from = useLinkPointPosition(link.from);
  const to = useLinkPointPosition(link.to);

  const generateCurvePath = (
    firstPoint: Position,
    lastPoint: Position,
    curvy: number = 0
  ) => {
    return `M${firstPoint.x},${firstPoint.y} C ${firstPoint.x},${firstPoint.y +
      curvy} ${lastPoint.x},${lastPoint.y - curvy} ${lastPoint.x},${
      lastPoint.y
    }`;
  };

  return (
    <path
      d={generateCurvePath(from, to, 80)}
      stroke="black"
      fill="transparent"
    />
  );
};
