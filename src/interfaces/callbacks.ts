import { Flow } from "./flow";
import {
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
  removeNode?: Callback<RemoveNodePayload>;
  linkStart?: Callback<LinkStartPayload>;
  linkMove?: Callback<LinkMovePayload>;
  linkEnd?: Callback<LinkEndPayload>;
  clearLinkingId?: Callback<ClearLinkingIdPayload>;
  linkContinue?: Callback<LinkContinuePayload>;
  removeLink?: Callback<RemoveLinkPayload>;
  select?: Callback<SelectPayload>;
}
