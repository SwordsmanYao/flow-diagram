import * as React from "react";
import { A, CanvasWrapper } from "../src";

export default { title: "Base" };

export const test = () => (
  <div>
    <A />
  </div>
);

export const Base = () => (
  <div style={{ margin: 20 }}>
    <CanvasWrapper width={900} height={900}>
      test
    </CanvasWrapper>
  </div>
);
