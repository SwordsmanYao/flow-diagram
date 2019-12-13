import * as React from "react";
import { CanvasWrapper, FlowWrapper } from "../src";
import { SetFlowAction } from "../src/hooks";
import { flowData } from "./flowData";

export default { title: "value" };

export const DefaultValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const handleChange = (action: SetFlowAction) => {
    setFlow(val => {
      console.log(val, "flow");
      return action(val);
    });
  };

  console.log(flow);

  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper>
        <FlowWrapper defaultValue={flowData} onChange={handleChange} />
      </CanvasWrapper>
    </div>
  );
};

export const ValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const handleChange = (action: SetFlowAction) => {
    setFlow(val => {
      console.log(val, "flow");
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20, height: "calc(100vh - 40px)" }}>
      <CanvasWrapper>
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
          onChange={handleChange}
        />
      </CanvasWrapper>
    </div>
  );
};
