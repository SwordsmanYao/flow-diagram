import * as React from "react";
import { Canvas } from "../../interfaces/canvas";

export const initialCanvas: Canvas = {
  position: {
    x: 0,
    y: 0
  },
  zoom: 1,
  ref: React.createRef()
};

export const CanvasContext = React.createContext<Canvas>(initialCanvas);
