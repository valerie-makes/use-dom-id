/**
 * @jest-environment jsdom
 */

import React from "react";
import MyApp from "./__MyApp";

import { render } from "react-dom";

describe("client-side rendering", () => {
  const root = document.createElement("div");
  document.body.appendChild(root);

  it("should render correctly", () => {
    render(<MyApp />, root);
    expect(root.innerHTML).toMatchSnapshot();
  });
});
