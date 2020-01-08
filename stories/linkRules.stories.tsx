import * as React from "react";
import { CanvasWrapper, FlowWrapper, useDispatchContext } from "../src";
import { flowData } from "./flowData";
import produce from "immer";

export default { title: "LinkRules" };

/** 只允许连线到port */
export const MustLinkToPort = () => {
  return (
    <div style={{ margin: 20 }}>
      <useDispatchContext.Provider>
        <CanvasWrapper width={900} height={900}>
          <FlowWrapper
            defaultValue={flowData}
            callbacks={{
              linkEnd: params => {
                const { flow, payload } = params;
                if (!payload.to) {
                  return produce(flow, draft => {
                    delete draft.links[payload.id];
                  });
                }
                return;
              }
            }}
          />
        </CanvasWrapper>
      </useDispatchContext.Provider>
    </div>
  );
};
