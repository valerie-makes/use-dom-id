# use-dom-id

`use-dom-id` is a React Hook that generates unique IDs for DOM elements. It is compatible with both server-side and client-side rendering, including SSR with client-side hydration. It is particularly useful for HTML forms, where unique IDs are required for labels. It can also be used for other purposes, such as SVG definitions.

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

The following HTML structure is produced during server-side rendering:

```html
<form>
  <label for="id-server-0">Full Name</label>
  <input id="id-server-0" type="text" />
</form>
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

The following HTML structure is produced during server-side rendering:

```html
<form>
  <label for="id-server-0">Full Name</label>
  <input id="id-server-0" type="text" />

  <label for="id-server-1">Email Address</label>
  <input id="id-server-1" type="email" />
</form>
```
