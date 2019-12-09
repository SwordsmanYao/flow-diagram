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

export const moveNode: DefaultCallback<Node> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    if (flow.nodes?.[payload.id]) {
      draft.nodes = {
        ...flow.nodes,
        [payload.id]: {
          ...flow.nodes?.[payload.id],
          position: payload.position,
        }
      };
    }
  })
}
