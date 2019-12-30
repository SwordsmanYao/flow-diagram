import { Flow } from "../src/interfaces/flow";

export const flowData: Flow = {
  nodes: {
    "node-1": {
      id: "node-1",
      type: "default",
      position: {
        x: 200,
        y: 200
      },
      ports: {
        "port-1-1": {
          id: "port-1-1",
          type: "default",
          position: {
            x: 100,
            y: 0
          }
        },
        "port-1-2": {
          id: "port-1-2",
          type: "default",
          position: {
            x: 100,
            y: 50
          }
        }
      }
    },
    "node-2": {
      id: "node-2",
      type: "default",
      position: {
        x: 200,
        y: 400
      },
      ports: {
        "port-1-1": {
          id: "port-1-1",
          type: "default",
          position: {
            x: 100,
            y: 0
          }
        },
        "port-1-2": {
          id: "port-1-2",
          type: "default",
          position: {
            x: 100,
            y: 50
          }
        }
      }
    }
  },
  links: {
    "link-1": {
      id: "link-1",
      type: "default",
      from: {
        nodeId: "node-1",
        portId: "port-1-2"
      },
      to: {
        nodeId: "node-2",
        portId: "port-1-1"
      }
    }
  }
};
