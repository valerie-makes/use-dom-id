import type { HTMLProps, SVGProps, MutableRefObject } from "react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

type IdProps<E extends Element> = { id: string; ref: MutableRefObject<E> };
type ElementProps = HTMLProps<HTMLElement> | SVGProps<SVGElement>;
type Generator<T extends ElementProps> = (id: string) => T;

let nextId = 0;
let hydrationComplete = false;

// For server-side renders:
// - Generate an ID immediately
// - Provide `idProps` and `useId`
function useServerDomId<E extends Element>(
  prefix: string,
): [IdProps<E>, typeof useId] {
  // useState, useRef etc are unnecessary for server renders - React
  // will only call each hook once because there is no interactivity
  const id = `${prefix}${nextId++}`;
  const idProps = { id } as IdProps<E>;

  const useId = <T extends ElementProps>(generator: Generator<T>): T =>
    generator(id);

  return [idProps, useId];
}

// For client-side renders:
// - ID is initially undefined
// - Hydration: Get DOM ID using ref
// - Non-hydration: generate new ID
function useClientDomId<E extends Element>(
  prefix: string,
): [IdProps<E>, typeof useId] {
  // React will preserve existing attributes if they are
  // undefined during hydration, but will warn by default
  const [id, setId] = useState<string | undefined>(
    hydrationComplete ? `${prefix}${nextId++}` : undefined,
  );
  const elementRef = useRef<E>();

  const idProps = {
    id,
    ref: elementRef,
    suppressHydrationWarning: true,
  } as IdProps<E>;

  // Do not provide any attributes if the ID is missing - React
  // will preserve existing server attributes during hydration
  const useId = <T extends ElementProps>(generator: Generator<T>): T => {
    if (id) return generator(id);
    return { suppressHydrationWarning: true } as T;
  };

  // Populate ID as soon as possible, after DOM mutations
  useLayoutEffect(() => {
    if (!hydrationComplete) {
      const element = elementRef.current as E;
      setId(element.id || `${prefix}${nextId++}`);
    }
  }, [prefix]);

  // Mark hydration as complete, so that future renders can
  // immediately generate an ID, rather than updating state
  useEffect(() => {
    hydrationComplete = true;
  }, []);

  return [idProps, useId];
}

export default function useDomId<E extends Element>(key = "id") {
  // ESLint warnings are false positives -- we always
  // run the same hook within a particular environment

  if (typeof window === "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useServerDomId<E>(`${key}-server-`);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClientDomId<E>(`${key}-client-`);
}
