/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Port } from "../../interfaces";

interface Props {
  port: Port;
}

export const DefaultPort: React.FC<Props> = props => {
  const { port } = props;
  const width = 6;
  const height = 6;
  return (
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
        background: red;
        display: inline-block;
        position: absolute;
        left: ${port.position.x - width/2}px;
        top: ${port.position.y - height/2}px;
      `}
    ></div>
  );
};
