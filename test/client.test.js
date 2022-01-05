/**
 * @jest-environment jsdom
 */

import React from "react";
import MyApp from "./__MyApp";

import { resetRenderContext } from "../lib";
import { render, hydrate } from "react-dom";

import snapshots from "./__snapshots__/server.test.js.snap";

describe("client-side rendering", () => {
  let container;
  const logRender = jest.fn();

  beforeEach(() => {
    resetRenderContext();
    logRender.mockClear();

    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("should render correctly", () => {
    render(<MyApp logRender={logRender} />, container);
    expect(container.innerHTML).toMatchSnapshot();
    expect(logRender).toBeCalledTimes(1);
  });

  it("should hydrate correctly", () => {
    container.innerHTML = JSON.parse(
      snapshots["server-side rendering should render correctly 1"],
    );
    hydrate(<MyApp logRender={logRender} />, container);
    expect(container.innerHTML).toMatchSnapshot();
    expect(logRender).toBeCalledTimes(2);
  });
});
