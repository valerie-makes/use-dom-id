# use-dom-id

[![MIT License](https://img.shields.io/github/license/valerie-makes/use-dom-id)](https://github.com/valerie-makes/use-dom-id/blob/main/LICENSE) [![NPM version](https://img.shields.io/npm/v/@valerie-makes/use-dom-id)](https://www.npmjs.com/package/@valerie-makes/use-dom-id) [![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@valerie-makes/use-dom-id)](https://snyk.io/test/npm/@valerie-makes/use-dom-id)

`use-dom-id` is a dependency-free React Hook for generating unique element IDs. It is compatible with both server-side and client-side rendering, including SSR with client-side hydration. It is particularly useful for HTML forms, where unique IDs are required for labels. It can also be used for other purposes, such as SVG definitions.

## Usage

### `useDomId<E extends Element>()`

Generate a unique ID for a particular type of DOM element.

```ts
const [idProps, useId] = useDomId<HTMLInputElement>();

// returns <input id="unique-id" />
return <input {...idProps} />;
```

### `useId<T>(generator: (id: string) => T)`

Using a particular ID, generate props for additional elements.

```ts
const labelProps = useId((id) => ({ htmlFor: id }));

// returns <label htmlFor="unique-id">My Label</label>
return <label {...labelProps}>My Label</label>;
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
  const emailLabelProps = useNameId((id) => ({ htmlFor: id }));

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
