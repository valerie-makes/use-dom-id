import React from "react";
import MyApp from "./__MyApp";

import { renderToString } from "react-dom/server";

describe("server-side rendering", () => {
  const logRender = jest.fn();

  it("should render correctly", () => {
    const result = renderToString(<MyApp logRender={logRender} />);
    expect(result).toMatchSnapshot();
    expect(logRender).toBeCalledTimes(1);
  });
});
