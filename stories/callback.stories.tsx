import * as React from "react";
import { CanvasWrapper, FlowWrapper } from "../src";
import { SetFlowAction } from "../src/hooks";
import { flowData } from "./flowData";
import produce from "immer";

export default { title: "callbacks" };

export const CallbackDemo = () => {
  const [flow, setFlow] = React.useState(flowData);

  const setValue = (action: SetFlowAction) => {
    setFlow(val => {
      console.log(val, "flow");
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper
          value={flow}
          callbacks={{
            moveNode: (params, defaultCallback) => {
              if (params.payload.position.x > 200) {
                // 对参数做拦截
                return defaultCallback(
                  produce(params, draft => {
                    draft.payload.position.x = 200;
                  })
                );
              }
              // 函数中没有return的话使用默认返回
              return;
            }
          }}
          setValue={setValue}
        />
      </CanvasWrapper>
    </div>
  );
};

export const CallbackDemo2 = () => {
  const [flow, setFlow] = React.useState(flowData);

  const setValue = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper
          value={flow}
          callbacks={{
            moveNode: (params, defaultCallback) => {
              if (params.payload.position.x > 200) {
                // 对默认callback返回做拦截
                const data = defaultCallback(params);
                return produce(data, draft => {
                  draft.nodes[params.payload.id].position.x = 200;
                });
              }
              return;
            }
          }}
          setValue={setValue}
        />
      </CanvasWrapper>
    </div>
  );
};

export const CallbackDemo3 = () => {
  const [flow, setFlow] = React.useState(flowData);

  const setValue = (action: SetFlowAction) => {
    setFlow(val => {
      return action(val);
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper
          value={flow}
          callbacks={{
            moveNode: params => {
              if (params.payload.position.x > 200) {
                // 自定义返回
                return produce(params.flow, draft => {
                  draft.nodes[params.payload.id].position.x = 200;
                  draft.nodes[params.payload.id].position.y =
                    params.payload.position.y;
                });
              }
              return;
            }
          }}
          setValue={setValue}
        />
      </CanvasWrapper>
    </div>
  );
};
