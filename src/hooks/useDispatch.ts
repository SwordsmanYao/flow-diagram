import * as defaultCallbacks from "../components/Flow/callbacks.default";
import { Flow, Node, Callbacks } from "../interfaces";

export interface Dispatch {
  (params: DispatchParams): void;
}

export type DispatchParams = {
  action: "addNode";
  payload: Node;
};

export interface SetFlowAction {
  (flow: Flow): Flow;
}

export const useDispatch = (
  setFlow: (action: SetFlowAction) => void,
  callbacks?: Callbacks
) => {
  const dispatch: Dispatch = params => {
    const { action, payload } = params;
    const defaultCallback = defaultCallbacks[action];
    if (defaultCallback) {
      const callback = callbacks && callbacks[action];
      // callback 没有返回值时使用 defaultCallback 的返回值
      setFlow(
        flow =>
          (callback &&
            callback(
              {
                payload,
                flow
              },
              defaultCallback
            )) ||
          defaultCallback({
            payload,
            flow
          })
      );
    } else {
      console.warn(`dispatch: no ${action} action`);
    }
  };

  return dispatch;
};
