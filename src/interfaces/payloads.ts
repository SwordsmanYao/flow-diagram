import { Link, Node, Flow } from "./flow";
import { Position } from "./generics";

export type AddNodePayload = Node;

export interface MoveNodePayload {
  id: string;
  position: Position;
}

export interface RemoveNodePayload {
  id: string;
}

export type LinkStartPayload = Omit<Link, "to"> & {
  to: Position;
};

export interface LinkMovePayload {
  id: string;
  to: Position;
}

export interface LinkEndPayload {
  id: string;
  to: Link["to"];
}

export interface ClearLinkingIdPayload {}

export interface LinkContinuePayload {
  id: string;
}

export interface RemoveLinkPayload {
  id: string;
}

export type SelectPayload = Flow["selected"];
