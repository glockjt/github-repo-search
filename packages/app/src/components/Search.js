import { useState, useEffect } from "react";
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

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const Search = props => {
  const onChange = e => setSearch(e.target.value);

  const [search, setSearch] = useState("");

  const debounceSearchTerm = useDebounce(search, 500);

  const onClick = async term => {
    props.onClick(term);
    window.scrollTo(0, 0);
  };

  useEffect(
    () => {
      if (debounceSearchTerm) {
        onClick(debounceSearchTerm);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceSearchTerm] // Only call effect if debounced search term changes
  );

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
        onChange={onChange}
      />
    </div>
  );
};

Search.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Search;
