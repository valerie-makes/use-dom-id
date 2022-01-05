# use-dom-id

[![Build status](https://github.com/valerie-makes/use-dom-id/actions/workflows/build-test.yml/badge.svg)](https://github.com/valerie-makes/use-dom-id/actions/workflows/build-test.yml) [![MIT License](https://img.shields.io/github/license/valerie-makes/use-dom-id)](https://github.com/valerie-makes/use-dom-id/blob/main/LICENSE) [![NPM version](https://img.shields.io/npm/v/@valerie-makes/use-dom-id)](https://www.npmjs.com/package/@valerie-makes/use-dom-id) [![Known Vulnerabilities](https://snyk.io/test/npm/@valerie-makes/use-dom-id/badge.svg)](https://snyk.io/test/npm/@valerie-makes/use-dom-id)

`use-dom-id` is a dependency-free React Hook for generating unique element IDs. It is compatible with both server-side and client-side rendering, including SSR with client-side hydration. It is particularly useful for HTML forms, where unique IDs are required for labels. It can also be used for other purposes, such as SVG definitions.

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
