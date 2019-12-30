import { Link, Node } from "./flow";
import { Position } from "./generics";

export type AddNodePayload = Node;

export interface MoveNodePayload {
  id: string;
  position: Position;
}

export type LinkStartPayload = Link;

export interface LinkMovePayload {
  id: string;
  to: Link["to"];
}

export interface LinkEndPayload {
  linkId: string;
  to: Link["to"];
}

export interface ClearLinkingIdPayload {}

export interface LinkContinuePayload {
  id: string;
}
