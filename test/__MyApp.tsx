import React from "react";
import useDomId from "../lib";

type MyAppProps = {
  logRender: () => void;
};

export default function MyApp({ logRender }: MyAppProps) {
  logRender();

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
