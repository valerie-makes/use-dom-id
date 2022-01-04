import React from "react";
import MyApp from "./__MyApp";

import { renderToString } from "react-dom/server";

describe("server-side rendering", () => {
  it("should render correctly", () => {
    const result = renderToString(<MyApp />);
    expect(result).toMatchSnapshot();
  });
});
