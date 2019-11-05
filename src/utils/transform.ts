import { Transform } from "../interfaces";
export const stringifyTransform = (transform: Transform) =>
  `scale(${transform.zoom}) translate(${transform.position.x}px, ${transform.position.y}px)`;

export const parseTransform = (str: string) => {
  const matchs = str.match(
    /^scale\(([\s\S]+)\) translate\(([\s\S]+)px, ([\s\S]+)px\)$/
  );
  if (matchs && matchs.length === 4) {
    return {
      zoom: Number(matchs[1]),
      position: {
        x: Number(matchs[2]),
        y: Number(matchs[3])
      }
    };
  }
  return undefined;
};
