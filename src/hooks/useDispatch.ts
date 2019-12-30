import * as defaultCallbacks from "../components/Flow/callbacks.default";
import {
  Flow,
  Callbacks,
  Callback,
  DefaultCallback,
  LinkMovePayload,
  LinkEndPayload,
  AddNodePayload,
  MoveNodePayload,
  LinkStartPayload,
  ClearLinkingIdPayload,
  LinkContinuePayload,
  RemoveNodePayload,
  RemoveLinkPayload,
  SelectPayload
} from "../interfaces";
import { useCallback } from "react";

export interface Dispatch {
  (params: DispatchParams): void;
}

export type DispatchParams =
  | {
      type: "addNode";
      payload: AddNodePayload;
    }
  | {
      type: "moveNode";
      payload: MoveNodePayload;
    }
  | {
      type: "removeNode";
      payload: RemoveNodePayload;
    }
  | {
      type: "linkStart";
      payload: LinkStartPayload;
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
      type: "removeLink";
      payload: RemoveLinkPayload;
    }
  | {
      type: "clearLinkingId";
      payload: ClearLinkingIdPayload;
    }
  | {
      type: "linkContinue";
      payload: LinkContinuePayload;
    }
  | {
      type: "select";
      payload: SelectPayload;
    };

export interface SetFlowAction {
  (flow: Flow): Flow;
}

export const useDispatch = (
  setFlow: (action: SetFlowAction) => void,
  callbacks?: Callbacks
) => {
  const dispatch: Dispatch = useCallback(
    params => {
      if (!params) {
        return;
      }
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
    },
    [setFlow, callbacks]
  );

  return dispatch;
};
