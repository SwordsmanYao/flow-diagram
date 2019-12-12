import { Flow, Node, Link } from "./flow";
import { LinkMovePayload, LinkEndPayload } from "./payloads";

export interface DefaultCallback<T> {
  (params: { flow: Flow; payload: T }): Flow;
}

export interface Callback<T> {
  (params: { flow: Flow; payload: T }, defaultCallback: DefaultCallback<T>):
    | Flow
    | undefined;
}

export interface Callbacks {
  addNode?: Callback<Node>;
  moveNode?: Callback<Node>;
  linkStart?: Callback<Link>;
  linkMove?: Callback<LinkMovePayload>;
  linkEnd?: Callback<LinkEndPayload>;
}
