import type { HTMLProps, SVGProps, MutableRefObject } from "react";
import { useRef, useState, useLayoutEffect } from "react";

type IdProps<E extends Element> = {
  id: string;
  "data-ssr"?: boolean;
  ref: MutableRefObject<E>;
};

type ElementProps = HTMLProps<HTMLElement> | SVGProps<SVGElement>;
type Generator<T extends ElementProps> = (id: string) => T;

let nextId = 0;
let hydrationComplete = false;

export function resetRenderContext() {
  nextId = 0;
  hydrationComplete = false;
}

// For server-side renders:
// - Generate an ID immediately
// - Provide `idProps` and `useId`
function useServerDomId<E extends Element>(
  prefix: string,
): [IdProps<E>, typeof useId] {
  const id = `${prefix}${nextId++}`;
  const idProps = { id, "data-ssr": true } as IdProps<E>;

  const useId = <T extends ElementProps>(generator: Generator<T>): T => {
    return generator(id);
  };

  return [idProps, useId];
}

// For client-side renders:
// - ID is initially undefined
// - Hydration: Get DOM ID using ref
// - Non-hydration: generate new ID
function useClientDomId<E extends Element>(
  prefix: string,
): [IdProps<E>, typeof useId] {
  // Mark hydration as complete if there are no more
  // elements with the attribute "data-ssr" remaining
  if (!hydrationComplete) {
    const remaining = document.querySelector("[data-ssr]");
    hydrationComplete = remaining == null;
  }

  // Only generate a fresh ID if hydration is complete
  const [id, setId] = useState<string | undefined>(
    hydrationComplete ? `${prefix}${nextId++}` : undefined,
  );
  const elementRef = useRef<E>();

  // React will preserve existing attributes if they are
  // undefined during hydration, but will warn by default
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
      const element = elementRef.current;
      element?.removeAttribute("data-ssr");
      setId(element?.id || `${prefix}${nextId++}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
