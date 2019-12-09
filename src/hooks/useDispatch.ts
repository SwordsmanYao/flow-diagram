import * as defaultCallbacks from "../components/Flow/callbacks.default";
import { Flow, Node, Callbacks } from "../interfaces";

export interface Dispatch {
  (params: DispatchParams): void;
}

export type DispatchParams =
  | {
      type: "addNode";
      payload: Node;
    }
  | {
      type: "moveNode";
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
    const { type, payload } = params;
    const defaultCallback = defaultCallbacks[type];
    if (defaultCallback) {
      const callback = callbacks && callbacks[type];
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
      console.warn(`dispatch: no ${type} action`);
    }
  };

  return dispatch;
};
