import * as React from "react";
import { CanvasWrapper, FlowWrapper } from "../src";
import { flowData } from "./flowData";
import produce from "immer";

export default { title: "linkRules" };

/** 只允许连线到port */
export const MustLinkToPort = () => {
  return (
    <div style={{ margin: 20 }}>
      <CanvasWrapper width={900} height={900}>
        <FlowWrapper
          defaultValue={flowData}
          callbacks={{
            linkEnd: params => {
              const { flow, payload } = params;
              if ("x" in payload.to) {
                return produce(flow, draft => {
                  delete draft.links[payload.linkId];
                });
              }
              return;
            }
          }}
        />
      </CanvasWrapper>
    </div>
  );
};
