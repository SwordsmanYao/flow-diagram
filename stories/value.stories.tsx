import * as React from "react";
import { CanvasWrapper, FlowWrapper } from "../src";
import { SetFlowAction } from "../src/hooks";
import { flowData } from "./flowData";

export default { title: "value" };

export const DefaultValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const handleChange = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };

  console.log(flow);

  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper defaultValue={flowData} onChange={handleChange} />
      </CanvasWrapper>
    </div>
  );
};

export const ValueDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const handleChange = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper value={flow} onChange={handleChange} />
      </CanvasWrapper>
    </div>
  );
};
