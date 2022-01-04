# use-dom-id

`use-dom-id` is a React Hook that generates unique IDs for DOM elements. This is particularly useful for forms, where unique IDs are required for accessible input-label pairs. It is compatible with both server-side and client-side rendering, including hydration.

## Usage

```tsx
import useDomId from "@valerie-makes/use-dom-id";

function MyForm() {
  const [nameInputProps, useNameId] = useDomId<HTMLInputElement>();
  const nameLabelProps = useNameId((id) => ({ htmlFor: id }));

  return (
    <form>
      <label {...nameLabelProps}>Name</label>
      <input {...nameInputProps} />
    </form>
  );
}
```
