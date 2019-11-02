import { RefObject, useEffect, useState } from "react";
import { Transform } from "../interfaces";
import { fromEvent } from "rxjs";
import { scan, map, switchMap, takeUntil } from "rxjs/operators";

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

      mouseDown$
        .pipe(
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
        )
        .subscribe(position => {
          setTransform(preState => ({
            ...preState,
            position: {
              x: position.x / preState.zoom,
              y: position.y / preState.zoom,
            }
          }));
        });

      wheel$
        .pipe(
          map(event => {
            event.preventDefault();
            event.stopPropagation();
            return event.deltaY;
          }),
          scan((sum, current) => sum - current * 0.01, initialTransform.zoom)
        )
        .subscribe(zoom => {
          setTransform(preState => ({
            ...preState,
            zoom
          }));
        });
    }
  }, []);

  return transform;
};
