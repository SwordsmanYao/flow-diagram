import * as React from "react";
import { Link, Position } from "../../interfaces";

export interface DefaultLinkProps {
  from: Position;
  to: Position;
  link: Link;
  selected: boolean;
}

export const DefaultLink: React.FC<DefaultLinkProps> = props => {
  const { from, to, selected } = props;

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
    <g>
      <path
        d={generateCurvePath(from, to, 80)}
        stroke="rgb(64, 176, 255)"
        strokeWidth="10px"
        fill="transparent"
        opacity={selected ? 0.4 : 0}
      />
      <path
        d={generateCurvePath(from, to, 80)}
        stroke="#000"
        strokeWidth="2px"
        fill="transparent"
      />
    </g>
  );
};
