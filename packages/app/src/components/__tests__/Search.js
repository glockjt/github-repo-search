import React from "react";
import renderer from "react-test-renderer";
import Search from "../Search";

describe("Search tests", () => {
  it("should render an empty search", () => {
    const tree = renderer.create(<Search onClick={jest.fn()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
