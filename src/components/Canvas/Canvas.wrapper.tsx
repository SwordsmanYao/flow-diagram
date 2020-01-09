/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useRef, ReactNode } from "react";
import { CanvasContext, initialCanvas } from "./CanvasContext";
import { useTransform, useDispatchContext } from "../../hooks";
import { stringifyTransform } from "../../utils";
import * as React from "react";

interface Props {
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

export const CanvasWrapper: React.FC<Props> = props => {
  const { children, width = "100%", height = "100%" } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const basicRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useDispatchContext();
  const { transform } = useTransform(
    {
      position: initialCanvas.position,
      zoom: initialCanvas.zoom
    },
    basicRef,
    containerRef,
    containerRef
  );

  const handleClick = () => {
    //TODO: 移动画布时不取消选中
    dispatch({
      type: "select",
      payload: undefined
    });
  };

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
            style={{
              width,
              height,
              overflow: "hidden",
              background: "#fafafa",
              position: "relative"
            }}
            onClick={handleClick}
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
