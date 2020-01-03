import * as React from "react";
import { CanvasWrapper, FlowWrapper } from "../src";
import { useDispatchContext } from "../src/hooks";
import * as uuid from "uuid/v4";

export default { title: "Dispatch" };

const Demo = () => {
  const { dispatch } = useDispatchContext();

  const handleAddNode = () => {
    dispatch({
      type: "addNode",
      payload: {
        id: uuid(),
        position: {
          x: 300,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            position: {
              x: 100,
              y: 0
            }
          },
          port2: {
            id: "port2",
            position: {
              x: 100,
              y: 50
            }
          }
        }
      }
    });
  };

  return (
    <div style={{ margin: 20 }}>
      <button onClick={handleAddNode}>add node</button>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper />
      </CanvasWrapper>
    </div>
  );
};

export const DispatchDemo = () => (
  <useDispatchContext.Provider>
    <Demo />
  </useDispatchContext.Provider>
);
