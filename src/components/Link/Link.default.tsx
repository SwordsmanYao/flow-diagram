import * as React from "react";
import { Link } from "../../interfaces";
import { useLinkPointPosition } from "../../hooks/useLinkPointPosition";

interface Props {
  link: Link;
}

export const DefaultLink: React.FC<Props> = props => {
  const { link } = props;
  const from = useLinkPointPosition(link.from);
  const to = useLinkPointPosition(link.to);

  return (
    <path
      d={`M${from.x} ${from.y} L ${to.x} ${to.y}`}
      stroke="black"
      fill="transparent"
    />
  );
};
