import { RefObject, useEffect } from "react";
import { Position } from "../interfaces";
import { fromEvent, Subscription } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";

interface UsePositionParams {
  zoom: number;
  /** 设置位置的目标元素 */
  targetElementRef: RefObject<HTMLElement>;
  /** 参照物元素 */
  relativeElementRef: RefObject<HTMLElement>;
  /** 触发鼠标事件的元素 */
  eventElementRef?: RefObject<HTMLElement>;
  onChange: (position: Position) => void;
}

export const usePosition = (params: UsePositionParams) => {
  const {
    zoom,
    targetElementRef,
    relativeElementRef,
    eventElementRef = targetElementRef,
    onChange
  } = params;

  useEffect(() => {
    let subscribe: Subscription;
    if (eventElementRef.current) {
      const mouseDown$ = fromEvent<MouseEvent>(
        eventElementRef.current,
        "mousedown"
      );
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");

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

      subscribe = move$.subscribe(position => {
        onChange({
          x: position.x / zoom,
          y: position.y / zoom
        });
      });
    }
    return () => subscribe && subscribe.unsubscribe();
  }, [zoom]);
};
