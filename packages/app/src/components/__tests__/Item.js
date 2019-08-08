import React from "react";
import renderer from "react-test-renderer";
import Item from "../Item";

describe("Item tests", () => {
  it("should render empty item", () => {
    const tree = renderer.create(<Item />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render a fully populated item", () => {
    const tree = renderer
      .create(
        <Item
          name="test"
          url="testurl.com"
          owner={{ avatar_url: "avatar.com", login: "login" }}
          language="JavaScript"
          stars={100}
          description="Testing"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render an item with no owner", () => {
    const tree = renderer
      .create(
        <Item
          name="test"
          url="testurl.com"
          language="JavaScript"
          stars={100}
          description="Testing"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
