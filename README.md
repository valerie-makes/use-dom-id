# use-dom-id

`use-dom-id` is a React Hook that generates unique IDs for DOM elements. It is compatible with both server-side and client-side rendering, including SSR with client-side hydration. It is particularly useful for HTML forms, where unique IDs are required to create accessible labels.

## Usage

Example: A form with a single labelled input element.

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

This creates the following HTML structure:

```html
<form>
  <label for="id-server-0">Full Name</label>
  <input id="id-server-0" type="text" />
</form>
```
