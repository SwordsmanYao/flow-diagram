import { Node, DefaultCallback, Link, LinkMovePayload, LinkEndPayload } from "../../interfaces";
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
    if (flow.nodes[payload.id]) {
      draft.nodes = {
        ...flow.nodes,
        [payload.id]: {
          ...flow.nodes[payload.id],
          position: payload.position
        }
      };
    }
  });
};

export const linkStart: DefaultCallback<Link> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    draft.links[payload.id] = payload;
    draft.linkingId = payload.id;
  });
};

export const linkMove: DefaultCallback<LinkMovePayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    if (payload.linkId) {
      draft.links[payload.linkId].to = payload.to;
    }
  });
};

export const linkEnd: DefaultCallback<LinkEndPayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    if (payload.linkId) {
      draft.links[payload.linkId].to = payload.to;
    }
  });
};
