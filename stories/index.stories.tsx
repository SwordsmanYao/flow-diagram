import * as React from "react";
import { CanvasWrapper, CanvasContext, Flow, FlowWrapper } from "../src";

export default { title: "Base" };

// 画布基本信息在 CanvasContext 中
export const CanvasDemo = () => (
  <div style={{ margin: 20 }}>
    <CanvasWrapper width={900} height={900}>
      <CanvasContext.Consumer>
        {transform =>
          `zoom: ${transform.zoom}, position.x: ${transform.position.x}, position.y: ${transform.position.y}`
        }
      </CanvasContext.Consumer>
    </CanvasWrapper>
  </div>
);

export const FlowDemo = () => {
  const flow: Flow = {
    nodes: {
      "node-1": {
        id: "node-1",
        type: "default",
        position: {
          x: 200,
          y: 200
        },
        ports: {
          "port-1-1": {
            id: "port-1-1",
            type: "default",
            position: {
              x: 100,
              y: 0
            }
          },
          "port-1-2": {
            id: "port-1-2",
            type: "default",
            position: {
              x: 100,
              y: 50
            }
          }
        }
      },
      "node-2": {
        id: "node-2",
        type: "default",
        position: {
          x: 400,
          y: 400
        },
        ports: {
          "port-1-1": {
            id: "port-1-1",
            type: "default",
            position: {
              x: 100,
              y: 0
            }
          },
          "port-1-2": {
            id: "port-1-2",
            type: "default",
            position: {
              x: 100,
              y: 50
            }
          }
        }
      }
    },
    links: {
      "link-1": {
        id: "link-1",
        type: "default",
        from: {
          nodeId: "node-1",
          portId: "port-1-2"
        },
        to: {
          nodeId: "node-2",
          portId: "port-1-1"
        }
      }
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper
          value={flow}
          // callbacks={{
          //   addNode: (params, defaultHandle) => {
          //     //! 函数中没有return的话使用默认返回
          //     // return defaultHandle();
          //     const default = defaultHandle(params);
          //     return {
          //       ...default,
          //       nodes: {},
          //     };
          //   }
          // }}
          // onChange={}
        />
      </CanvasWrapper>
    </div>
  );
};
