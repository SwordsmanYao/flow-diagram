/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { stringifyTransform } from "../../utils";
import { useContext, ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";

interface Props {
  children: ReactNode;
}

export const HtmlWrapper: React.FC<Props> = props => {
  const { children } = props;
  const canvas = useContext(CanvasContext);
  return (
    <div
      style={{
        transform: stringifyTransform(canvas)
      }}
      css={css`
        width: 0;
        height: 0;
        position: "absolute";
      `}
    >
      {children}
    </div>
  );
};
