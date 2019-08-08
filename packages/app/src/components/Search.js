import { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Input = styled.input`
  padding: 16px 8px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #d9e2ec;
  background-color: #d9e2ec;

  :focus {
    outline: none;
    border: 1px solid #2cb1bc;
    background-color: #fff;
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 16px;
  border: 1px solid #2cb1bc;
  background-color: #2cb1bc;
  color: #044e54;
  font-weight: 600;
`;

const Search = props => {
  const onClick = async () => {
    props.onClick(search);
    window.scrollTo(0, 0);
  };

  const onKeyDown = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const onChange = e => setSearch(e.target.value);

  const [search, setSearch] = useState("");
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        position: fixed;
        top: 0;
      `}
    >
      <Input
        placeholder="Search for repos"
        value={search}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <Button onClick={onClick}>Search</Button>
    </div>
  );
};

Search.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Search;
