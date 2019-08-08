import React from "react";
import renderer from "react-test-renderer";
import Select from "../Select";

describe("Select Component Tests", () => {
  it("renders correctly with no options", () => {
    const tree = renderer.create(<Select />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with options", () => {
    const tree = renderer
      .create(
        <Select>
          <option>Test Item</option>
        </Select>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
