import { Link } from "./flow";

export interface AddNodePayload {

}

export interface MoveNodePayload {

}

export interface LinkStartPayload {

}

export interface LinkMovePayload {
  linkId: string;
  to: Link['to'];
}

export interface LinkEndPayload {
  linkId: string;
  to: Link['to'];
}