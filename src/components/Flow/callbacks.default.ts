import {
  DefaultCallback,
  LinkMovePayload,
  LinkEndPayload,
  LinkStartPayload,
  AddNodePayload,
  MoveNodePayload,
  ClearLinkingIdPayload,
  LinkContinuePayload,
  RemoveNodePayload,
  RemoveLinkPayload,
  SelectPayload
} from "../../interfaces";
import produce from "immer";

export const addNode: DefaultCallback<AddNodePayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    draft.nodes = {
      ...flow.nodes,
      [payload.id]: payload
    };
  });
};

export const moveNode: DefaultCallback<MoveNodePayload> = params => {
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

export const removeNode: DefaultCallback<RemoveNodePayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    delete draft.nodes[payload.id];
    for (let linkId in flow.links) {
      if (flow.links.hasOwnProperty(linkId)) {
        const from = flow.links[linkId].from;
        const to = flow.links[linkId].to;
        if ("nodeId" in from && from.nodeId === payload.id) {
          delete draft.links[linkId];
        } else if ("nodeId" in to && to.nodeId === payload.id) {
          delete draft.links[linkId];
        }
      }
    }
  });
};

export const linkStart: DefaultCallback<LinkStartPayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    draft.links[payload.id] = payload;
    draft.linkingId = payload.id;
  });
};

export const linkMove: DefaultCallback<LinkMovePayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    if (payload.id) {
      draft.links[payload.id].to = payload.to;
    }
  });
};

export const linkEnd: DefaultCallback<LinkEndPayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    if (payload.id) {
      if (payload.to) {
        draft.links[payload.id].to = payload.to;
      }
    }
  });
};

/** linkEnd 后需要手动清除 linkingId */
export const clearLinkingId: DefaultCallback<
  ClearLinkingIdPayload
> = params => {
  const { flow } = params;
  return produce(flow, draft => {
    delete draft.linkingId;
  });
};

export const linkContinue: DefaultCallback<LinkContinuePayload> = params => {
  const { flow, payload } = params;
  return {
    ...flow,
    linkingId: payload.id
  };
};

export const removeLink: DefaultCallback<RemoveLinkPayload> = params => {
  const { flow, payload } = params;
  return produce(flow, draft => {
    delete draft.links[payload.id];
  });
};

export const select: DefaultCallback<SelectPayload> = params => {
  const { flow, payload } = params;
  return {
    ...flow,
    selected: payload
  };
};
