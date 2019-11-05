/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRef, ReactNode } from "react";
import { CanvasContext, initialCanvas } from "./CanvasContext";
import { useTransform } from "../../hooks";
import { stringifyTransform } from "../../utils";

interface Props {
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

export const CanvasWrapper: React.FC<Props> = props => {
  const { children, width = 500, height = 500 } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { position, zoom } = useTransform(
    {
      position: initialCanvas.position,
      zoom: initialCanvas.zoom
    },
    canvasRef,
    containerRef,
    containerRef
  );

  return (
    <CanvasContext.Provider
      value={{
        position,
        zoom,
        ref: canvasRef
      }}
    >
      <CanvasContext.Consumer>
        {canvas => (
          <div
            ref={containerRef}
            style={{ width, height, overflow: "hidden", background: "#eee" }}
          >
            <div
              ref={canvasRef}
              style={{
                transform: stringifyTransform(canvas)
              }}
              css={css`
                width: 0;
                height: 0;
                background: #eee;
              `}
            >
              {children}
            </div>
          </div>
        )}
      </CanvasContext.Consumer>
    </CanvasContext.Provider>
  );
};
