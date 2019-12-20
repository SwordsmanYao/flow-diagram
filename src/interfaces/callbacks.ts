import { Flow } from "./flow";
import {
  LinkMovePayload,
  LinkEndPayload,
  AddNodePayload,
  MoveNodePayload,
  LinkStartPayload,
  ClearLinkingIdPayload,
  LinkContinuePayload
} from "./payloads";

export interface DefaultCallback<T> {
  (params: { flow: Flow; payload: T }): Flow;
}

export interface Callback<T> {
  (params: { flow: Flow; payload: T }, defaultCallback: DefaultCallback<T>):
    | Flow
    | undefined;
}

export interface Callbacks {
  addNode?: Callback<AddNodePayload>;
  moveNode?: Callback<MoveNodePayload>;
  linkStart?: Callback<LinkStartPayload>;
  linkMove?: Callback<LinkMovePayload>;
  linkEnd?: Callback<LinkEndPayload>;
  clearLinkingId?: Callback<ClearLinkingIdPayload>;
  linkContinue?: Callback<LinkContinuePayload>;
}
