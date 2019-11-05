import { RefObject, useEffect, useState } from "react";
import { Transform } from "../interfaces";
import { fromEvent } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";

/**
 *
 * @param initialPosition 初始位置
 * @param targetElementRef 设置位置的目标元素
 * @param relativeElementRef 参照物元素
 * @param eventElementRef 触发鼠标事件的元素
 */
export const useTransform = (
  initialTransform: Transform,
  targetElementRef: RefObject<HTMLElement>,
  relativeElementRef: RefObject<HTMLElement>,
  eventElementRef: RefObject<HTMLElement> = targetElementRef
) => {
  const [transform, setTransform] = useState<Transform>(initialTransform);
  useEffect(() => {
    if (eventElementRef.current) {
      const mouseDown$ = fromEvent<MouseEvent>(
        eventElementRef.current,
        "mousedown"
      );
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");
      const wheel$ = fromEvent<WheelEvent>(eventElementRef.current, "wheel");

      const move$ = mouseDown$.pipe(
        map(event => {
          event.preventDefault();
          event.stopPropagation();
          const relativeRect = relativeElementRef.current!.getBoundingClientRect();
          const targetRect = targetElementRef.current!.getBoundingClientRect();
          return {
            prePosition: {
              x: targetRect.left - relativeRect.left,
              y: targetRect.top - relativeRect.top
            },
            downEvent: event
          };
        }),
        switchMap(({ prePosition, downEvent }) => {
          return mouseMove$.pipe(
            takeUntil(mouseUp$),
            map(moveEvent => ({
              x: prePosition.x + moveEvent.clientX - downEvent.clientX,
              y: prePosition.y + moveEvent.clientY - downEvent.clientY
            }))
          );
        })
      );

      const zoom$ = wheel$.pipe(
        map(event => {
          event.preventDefault();
          event.stopPropagation();
          const targetRect = targetElementRef.current!.getBoundingClientRect();
          return {
            event,
            targetRect
          };
        }),
        map(
          ({ event, targetRect }) => {
            const transformStr = targetElementRef.current!.style.transform;
            const matchs = transformStr.match(
              /^scale\(([\s\S]+)\) translate\(([\s\S]+)px, ([\s\S]+)px\)$/
            ) as any;
            const preZoom = Number(matchs[1]);
            const positionX = Number(matchs[2]);
            const positionY = Number(matchs[3]);
            const zoom = preZoom + (event.deltaY * 0.01) / 53;
            const x =
              ((event.clientX - targetRect.left) * (1 - zoom / preZoom) +
                positionX * preZoom) /
              zoom;
            const y =
              ((event.clientY - targetRect.top) * (1 - zoom / preZoom) +
                positionY * preZoom) /
              zoom;
            return {
              zoom,
              position: {
                x,
                y
              }
            };
          }
        )
      );

      move$.subscribe(position => {
        setTransform(preState => ({
          ...preState,
          position: {
            x: position.x / preState.zoom,
            y: position.y / preState.zoom
          }
        }));
      });

      zoom$.subscribe(val => {
        targetElementRef.current!.style.transform = `scale(${val.zoom}) translate(${val.position.x}px, ${val.position.y}px)`;
        setTransform(val);
      });
    }
  }, []);

  return transform;
};
