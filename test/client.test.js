/**
 * @jest-environment jsdom
 */

import React from "react";
import MyApp from "./__MyApp";

import { resetRenderContext } from "../lib";
import { render, hydrate } from "react-dom";

import snapshots from "./__snapshots__/server.test.js.snap";

describe("client-side rendering", () => {
  let root;

  beforeEach(() => {
    resetRenderContext();

    root = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(root);
  });

  it("should render correctly", () => {
    render(<MyApp />, root);
    expect(root.innerHTML).toMatchSnapshot();
  });

  it("should hydrate correctly", () => {
    root.innerHTML = JSON.parse(
      snapshots["server-side rendering should render correctly 1"],
    );
    hydrate(<MyApp />, root);
    expect(root.innerHTML).toMatchSnapshot();
  });
});
