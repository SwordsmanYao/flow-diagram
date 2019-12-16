import * as React from "react";
import { CanvasWrapper, FlowWrapper, Flow } from "../src";
import { SetFlowAction } from "../src/hooks";
import { flowData } from "./flowData";

export default { title: "value" };

export const DefaultValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  console.log('flow', flow);
  // 这里可以直接使用 setFlow 给 setValue
  const setValue = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };

  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper defaultValue={flowData} setValue={setValue} />
      </CanvasWrapper>
    </div>
  );
};

export const ValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const setValue = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper value={flow} setValue={setValue} />
      </CanvasWrapper>
    </div>
  );
};

/** 建议优先使用 setValue */
export const OnchangeDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const handleChange = (value: Flow) => {
    setFlow(value);
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper value={flow} onChange={handleChange} />
      </CanvasWrapper>
    </div>
  );
};