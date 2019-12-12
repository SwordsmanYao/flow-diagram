import { RefObject, useEffect, useContext, useRef } from "react";
import { Position } from "../interfaces";
import { fromEvent, Subscription, Observable } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { CanvasContext } from "../components";

interface UsePositionParams {
  /** 设置位置的目标元素 */
  targetElementRef: RefObject<HTMLElement>;
  onMove: (position: Position) => void;
  /** 触发鼠标事件的元素 */
  eventElementRef?: RefObject<HTMLElement>;
  onMouseDown?: (event: MouseEvent) => void;
}

export const usePosition = (params: UsePositionParams) => {
  const {
    targetElementRef,
    eventElementRef = targetElementRef,
    onMove,
    onMouseDown
  } = params;

  const { zoom, ref: relativeElementRef } = useContext(CanvasContext);

  const move$Ref = useRef<Observable<{ x: number; y: number }>>();

  useEffect(() => {
    if (eventElementRef.current) {
      const mouseDown$ = fromEvent<MouseEvent>(
        eventElementRef.current,
        "mousedown"
      );
      const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
      const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");

      move$Ref.current = mouseDown$.pipe(
        map(event => {
          event.preventDefault();
          event.stopPropagation();
          onMouseDown && onMouseDown(event);
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
    }
  });

  useEffect(() => {
    let subscribe: Subscription;
    if (move$Ref.current) {
      subscribe = move$Ref.current.subscribe(position => {
        onMove({
          x: position.x / zoom,
          y: position.y / zoom
        });
      });
    }

    return () => subscribe.unsubscribe();
  }, [zoom]);
};
