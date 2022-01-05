# use-dom-id

[![Build status](https://github.com/valerie-makes/use-dom-id/actions/workflows/build-test.yml/badge.svg)](https://github.com/valerie-makes/use-dom-id/actions/workflows/build-test.yml) [![NPM version](https://badgen.net/npm/v/@valerie-makes/use-dom-id)](https://www.npmjs.com/package/@valerie-makes/use-dom-id) [![Minzipped Size](https://badgen.net/bundlephobia/minzip/@valerie-makes/use-dom-id)](https://bundlephobia.com/package/@valerie-makes/use-dom-id) [![Types Included](https://badgen.net/npm/types/tslib)](https://www.npmjs.com/package/@valerie-makes/use-dom-id) [![MIT License](https://badgen.net/npm/license/@valerie-makes/use-dom-id)](https://github.com/valerie-makes/use-dom-id/blob/main/LICENSE) [![Known Vulnerabilities](https://snyk.io/test/npm/@valerie-makes/use-dom-id/badge.svg)](https://snyk.io/test/npm/@valerie-makes/use-dom-id)

`use-dom-id` is a dependency-free React Hook for generating unique element IDs. It is compatible with both server-side and client-side rendering, including SSR with client-side hydration. It is particularly useful for HTML forms, where unique IDs are required for labels. It can also be used for other purposes, such as SVG definitions.

## Examples

### Form with single labelled input element

```tsx
import useDomId from "@valerie-makes/use-dom-id";

function MyForm() {
  const [nameInputProps, useNameId] = useDomId<HTMLInputElement>();
  const nameLabelProps = useNameId((id) => ({ htmlFor: id }));

  return (
    <form>
      <label {...nameLabelProps}>Full Name</label>
      <input {...nameInputProps} type="text" />
    </form>
  );
}
```

### Form with multiple labelled input elements

```tsx
import useDomId from "@valerie-makes/use-dom-id";

function MyForm() {
  const [nameInputProps, useNameId] = useDomId<HTMLInputElement>();
  const nameLabelProps = useNameId((id) => ({ htmlFor: id }));

  const [emailInputProps, useEmailId] = useDomId<HTMLInputElement>();
  const emailLabelProps = useEmailId((id) => ({ htmlFor: id }));

  return (
    <form>
      <label {...nameLabelProps}>Full Name</label>
      <input {...nameInputProps} type="text" />

      <label {...emailLabelProps}>Email Address</label>
      <input {...emailInputProps} type="email" />
    </form>
  );
}
```

## Usage

Outputs below are accurate for a server-rendering environment. The prefix `id-client` is used during client-side rendering to avoid collisions, except during hydration, in which IDs provided by the server are preserved.

### `useDomId<E extends Element>()`

Generate a unique ID for a particular type of DOM element.

```ts
import useDomId from "@valerie-makes/use-dom-id";
```

```ts
const [idProps, useId] = useDomId<HTMLInputElement>();

// returns <input id="id-server-0" />
return <input {...idProps} />;
```

### `useDomId<E extends Element>(key: string)`

Generate a unique ID for a particular type of DOM element, using a custom key.

```ts
import useDomId from "@valerie-makes/use-dom-id";
```

```ts
const [idProps, useId] = useDomId<HTMLInputElement>("my-key");

// returns <input id="my-key-server-0" />
return <input {...idProps} />;
```

### `useId<T>(generator: (id: string) => T)`

Using a particular ID, generate props for additional elements.

```ts
const [idProps, useId] = useDomId<HTMLInputElement>();
```

```ts
const labelProps = useId((id) => ({ htmlFor: id }));

// returns <label htmlFor="id-server-0">My Label</label>
return <label {...labelProps}>My Label</label>;
```

### `resetRenderContext()`

Resets render context variables, including the next ID. Useful to run before calling `renderToString()` in a server application such as Express, and before running tests, to ensure predictable outputs.

```ts
import { resetRenderContext } from "@valerie-makes/use-dom-id";
```

```ts
resetRenderContext(); // next ID is now 0
```

## License

Copyright (c) 2022 Valerie Bailey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
