/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Port, Node } from "../../interfaces";

export interface DefaultPortProps {
  port: Port;
  node: Node;
}

export const DefaultPort: React.FC<DefaultPortProps> = () => {
  const width = 6;
  const height = 6;
  const color = "rgb(64, 176, 255)";
  return (
    <div
      css={css`
        position: absolute;
        left: ${-width / 2}px;
        top: ${-height / 2}px;
        width: ${width}px;
        height: ${height}px;
        background: #fff;
        cursor: crosshair;
        border: 1px solid ${color};
        border-radius: ${width}px;
      `}
    ></div>
  );
};
