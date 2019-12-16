import * as React from "react";
import { stringifyTransform } from "../../utils";
import { useContext, ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";

interface Props {
  children: ReactNode;
}

export const SvgWrapper: React.FC<Props> = props => {
  const { children } = props;
  const canvas = useContext(CanvasContext);
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", left: 0, top: 0 }}>
      <g
        style={{
          transform: stringifyTransform(canvas)
        }}
      >
        {children}
      </g>
    </svg>
  );
};
