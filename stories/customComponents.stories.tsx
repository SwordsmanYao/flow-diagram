/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { CanvasWrapper, FlowWrapper, DefaultNodeProps, Flow, DefaultLinkProps, DefaultPortProps } from "../src";
import { useDispatchContext } from "../src/hooks";
import produce from "immer";

export default { title: "CustomComponents" };

const flowData: Flow = {
  nodes: {
    "node-1": {
      id: "node-1",
      type: "mynode",
      properties: {
        name: "custom node 1",
      },
      position: {
        x: 200,
        y: 200
      },
      ports: {
        "port-1-1": {
          id: "port-1-1",
          type: "myport",
          position: {
            x: 100,
            y: 0
          }
        },
        "port-1-2": {
          id: "port-1-2",
          type: "myport",
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
        x: 200,
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
      type: "mylink",
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

interface NodeProps extends DefaultNodeProps {};

const MyNode: React.FC<NodeProps> = props => {
  const { node } = props;
  return (
    <div
      style={{
        border: "1px solid #40b0ff",
        width: 200,
        height: 50,
      }}
    >
      {node.properties?.name}
    </div>
  );
};


interface LinkProps extends DefaultLinkProps {};

const MyLink: React.FC<LinkProps> = props => {
  const { from, to } = props;
  return (
    <path
      d={`M${from.x},${from.y} L${to.x},${to.y}`}
      stroke="black"
      fill="transparent"
    />
  );
};


interface PortProps extends DefaultPortProps {};

const MyPort: React.FC<PortProps> = props => {
  const width = 10;
  const height = 10;
  return (
    <div
      css={css`
        position: absolute;
        left: ${-width / 2}px;
        top: ${-height / 2}px;
        width: ${width}px;
        height: ${height}px;
        border: 1px solid red;
        background: #fff;
        cursor: crosshair;
      `}
    ></div>
  );
}

export const CustomNode = () => {
  return (
    <div style={{ margin: 20 }}>
      <useDispatchContext.Provider>
        <CanvasWrapper width={900} height={900}>
          <FlowWrapper
            defaultValue={flowData}
            components={{
              nodeComponents: {
                'mynode': MyNode,
              },
              linkComponents: {
                'mylink': MyLink,
              },
              portComponents: {
                'myport': MyPort,
              }
            }}
            callbacks={{
              linkStart: (params, defaultCallback) => {
                return defaultCallback(
                  produce(params, draft => {
                    draft.payload.type = 'mylink';
                  })
                );
              }
            }}
          />
        </CanvasWrapper>
      </useDispatchContext.Provider>
    </div>
  );
};
