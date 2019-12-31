import * as React from "react";
import { CanvasWrapper, CanvasContext } from "../src";

export default { title: "Base" };

// 画布基本信息在 CanvasContext 中
export const CanvasDemo = () => (
  <div style={{ margin: 20 }}>
    <CanvasWrapper>
      <CanvasContext.Consumer>
        {transform =>
          `zoom: ${transform.zoom}, position.x: ${transform.position.x}, position.y: ${transform.position.y}`
        }
      </CanvasContext.Consumer>
    </CanvasWrapper>
  </div>
);
