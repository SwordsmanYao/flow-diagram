/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRef, ReactNode } from "react";
import { CanvasContext, initialCanvas } from "./CanvasContext";
import { useTransform } from "../../hooks";
import { stringifyTransform } from "../../utils";
import * as React from "react";

interface Props {
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

export const CanvasWrapper: React.FC<Props> = props => {
  const { children, width = 500, height = 500 } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const basicRef = useRef<HTMLDivElement>(null);
  const { transform } = useTransform(
    {
      position: initialCanvas.position,
      zoom: initialCanvas.zoom
    },
    basicRef,
    containerRef,
    containerRef
  );

  return (
    <CanvasContext.Provider
      value={{
        ...transform,
        ref: basicRef
      }}
    >
      <CanvasContext.Consumer>
        {canvas => (
          <div
            ref={containerRef}
            style={{ width, height, overflow: "hidden", background: "#eee", position: 'relative' }}
          >
            <div
              ref={basicRef}
              style={{
                transform: stringifyTransform(canvas)
              }}
              css={css`
                width: 0;
                height: 0;
              `}
            ></div>
            {children}
          </div>
        )}
      </CanvasContext.Consumer>
    </CanvasContext.Provider>
  );
};
