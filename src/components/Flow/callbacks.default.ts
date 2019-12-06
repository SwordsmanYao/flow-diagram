import { Node, DefaultCallback } from "../../interfaces";
import produce from "immer";

export const addNode: DefaultCallback<Node> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    draft.nodes = {
      ...flow.nodes,
      [payload.id]: payload
    };
  });
};
