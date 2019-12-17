import * as defaultCallbacks from "../components/Flow/callbacks.default";
import {
  Flow,
  Node,
  Callbacks,
  Link,
  Callback,
  DefaultCallback,
  LinkMovePayload,
  LinkEndPayload
} from "../interfaces";

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
    }
  | {
      type: "linkStart";
      payload: Link;
    }
  | {
      type: "linkMove";
      payload: LinkMovePayload;
    }
  | {
      type: "linkEnd";
      payload: LinkEndPayload;
    }
  | {
      type: "clearLinkingId";
      payload?: void;
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
    const defaultCallback = defaultCallbacks[type] as DefaultCallback<
      typeof payload
    >;
    if (defaultCallback) {
      const callback =
        callbacks && (callbacks[type] as Callback<typeof payload>);
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
