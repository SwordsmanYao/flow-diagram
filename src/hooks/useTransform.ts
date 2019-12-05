import { RefObject, useEffect, useState } from "react";
import { Transform } from "../interfaces";
import { fromEvent } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { parseTransform, stringifyTransform } from "../utils";

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
        map(({ event, targetRect }) => {
          const pre = parseTransform(targetElementRef.current!.style.transform);
          if (pre) {
            let zoom = pre.zoom - (event.deltaY * 0.01) / 53;

            if (zoom < 0.1) {
              zoom = 0.1;
            }

            // 鼠标相对目标元素的位置
            const mousePositionX = event.clientX - targetRect.left;
            const mousePositionY = event.clientY - targetRect.top;

            // zoom 的变更比例
            const diffRatio = 1 - zoom / pre.zoom;

            // 实际偏移，（经过zoom后的）
            const offsetX =
              mousePositionX * diffRatio + pre.position.x * pre.zoom;
            const offsetY =
              mousePositionY * diffRatio + pre.position.y * pre.zoom;

            // zoom 前的偏移，即 position
            const x = offsetX / zoom;
            const y = offsetY / zoom;
            return {
              zoom,
              position: {
                x,
                y
              }
            };
          }
          return {
            zoom: 1,
            position: {
              x: 0,
              y: 0
            }
          };
        })
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
        targetElementRef.current!.style.transform = stringifyTransform(val);
        setTransform(val);
      });
    }
  }, []);

  return { transform, setTransform };
};
