import { useLayoutEffect, useMemo, useRef, DependencyList } from 'react';

export function useEventCallback<T>(fn: T, deps?: DependencyList) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = fn;
  }, deps);
  // @ts-ignore
  return useMemo(() => (...args) => (0, ref.current)(...args), []) as T;
}