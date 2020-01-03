import * as React from "react";
import { Link, Position } from "../../interfaces";

export interface DefaultLinkProps {
  from: Position;
  to: Position;
  link: Link;
}

export const DefaultLink: React.FC<DefaultLinkProps> = props => {
  const { from, to } = props;

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
