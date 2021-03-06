import { RefObject, useEffect, useContext, useRef } from "react";
import { Position } from "../interfaces";
import { fromEvent, Subscription, Observable } from "rxjs";
import { map, switchMap, takeUntil, merge, scan, filter } from "rxjs/operators";
import { CanvasContext } from "../components";

interface UsePositionParams {
  /** 设置位置的目标元素 */
  targetElementRef: RefObject<Element>;
  onMove: (position: Position) => void;
  /** 触发鼠标事件的元素 */
  eventElementRef?: RefObject<Element>;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event?: MouseEvent) => void;
  /** 移动时矫正偏移，元素的(0,0)点跟随鼠标移动 */
  correctOffset?: boolean;
}

export const useMove = (params: UsePositionParams) => {
  const {
    targetElementRef,
    eventElementRef = targetElementRef,
    onMove,
    onMouseDown,
    onMouseUp,
    correctOffset = false
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
            downEvent: event,
            targetRect
          };
        }),
        switchMap(({ prePosition, downEvent, targetRect }) => {
          return mouseMove$.pipe(
            takeUntil(mouseUp$),
            map(moveEvent => ({
              x: prePosition.x + moveEvent.clientX - (correctOffset ? targetRect.left : downEvent.clientX),
              y: prePosition.y + moveEvent.clientY - (correctOffset ? targetRect.top : downEvent.clientY)
            }))
          );
        })
      );

      mouseDown$.pipe(
        merge(mouseUp$),
        scan<MouseEvent, { pre?: MouseEvent; current?: MouseEvent }>((acc, current) => ({
          pre: acc.current,
          current: current
        }), {}),
        filter(({ pre }) => pre?.type === 'mousedown')
      ).subscribe(({ current }) => {
        onMouseUp && onMouseUp(current);
      });
    }
  }, []);

  useEffect(() => {
    let subscribe: Subscription;
    if (move$Ref.current) {
      subscribe = move$Ref.current.subscribe(
        position => {
          onMove({
            x: position.x / zoom,
            y: position.y / zoom
          });
        },
      );
    }

    return () => subscribe.unsubscribe();
  }, [zoom]);
};
