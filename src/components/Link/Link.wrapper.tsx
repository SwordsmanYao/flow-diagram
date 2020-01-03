import * as React from "react";
import { Link } from "../../interfaces";
import { useLinkPointPosition } from "../../hooks";
import { DefaultLink } from "./Link.default";
import { ComponentsContext } from "../Flow";

interface Props {
  link: Link;
}

export const LinkWrapper: React.FC<Props> = props => {
  const { link } = props;
  const from = useLinkPointPosition(link.from);
  const to = useLinkPointPosition(link.to);
  const { linkComponents } = React.useContext(ComponentsContext);

  const Component = React.useMemo(() => link.type && linkComponents?.[link.type] || DefaultLink, [linkComponents, link.type, DefaultLink]);

  return <Component from={from} to={to} link={link} />;
};
