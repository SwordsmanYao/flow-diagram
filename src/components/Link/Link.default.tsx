import * as React from "react";
import { Link } from "../../interfaces";
import { useReferencePort } from "../Flow/useReferencePort";

interface Props {
  link: Link;
}

export const DefaultLink: React.FC<Props> = props => {
  const { link } = props;
  const fromPort = useReferencePort(link.from);
  const toPort = useReferencePort(link.to);

  return (
    <path
      d={`M${fromPort?.absolutePosition.x} ${fromPort?.absolutePosition.y} L ${toPort?.absolutePosition.x} ${toPort?.absolutePosition.y}`}
      stroke="black"
      fill="transparent"
    />
  );
};
