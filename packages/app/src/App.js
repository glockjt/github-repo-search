import { useState } from "react";
import api from "./services/api";
import Search from "./components/Search";
import Item from "./components/Item";
import styled from "@emotion/styled";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import Select from "./components/Select";
import Message from "./components/Message";
import Loading from "./components/Loading";

const Wrapper = styled.div`
  margin: 16px;
  margin-top: 72px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const App = props => {
  const onClick = async term => {
    search(term, values.sort, values.order);
  };

  const search = async (term, sort, order) => {
    setValues({
      ...values,
      results: { items: [] },
      loading: true
    });
    try {
      const results = await api.search(term, sort, order);
      setValues({
        ...values,
        term,
        results,
        sort,
        order,
        loading: false,
        error: false
      });
    } catch (err) {
      setValues({ ...values, error: true });
    }
  };

  const onSelect = e => {
    const { value } = e.target;

    if (value) {
      const [sort, order] = value.split("-");
      search(values.term, sort, order);
    }
  };

  const [values, setValues] = useState({
    results: { items: [] },
    term: "",
    sort: "score",
    order: "desc",
    loading: false,
    error: false
  });

  return (
    <div>
      <Global
        styles={css`
          * {
            font-family: "Lato", sans-serif;
            box-sizing: border-box;
          }
          html,
          body {
            background-color: #f0f4f8;
          }
        `}
      />
      <Search onClick={onClick} />
      <Wrapper>
        {!!values.results.items.length && (
          <ListHeader>
            <div>
              Showing {values.results.items.length} of{" "}
              {values.results.total_count}
            </div>
            <Select
              value={`${values.sort}-${values.order}`}
              onChange={onSelect}
            >
              <option value="score-desc">Sort: Best Match</option>
              <option value="stars-desc">Sort: Most Stars</option>
              <option value="stars-asc">Sort: Least Starts</option>
            </Select>
          </ListHeader>
        )}
        <div>
          {values.error && <Message>Oops an error occurred.</Message>}
          {!values.error && !values.results.items.length && !values.loading && (
            <Message>
              No repos yet, trying searching for one like 'testing'
            </Message>
          )}
          {!values.error && values.loading && (
            <div
              css={css`
                position: absolute;
                top: 114px;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
              `}
            >
              <Loading />
            </div>
          )}
          {values.results.items.map(result => (
            <Item
              key={result.id}
              name={result.name}
              url={result.html_url}
              owner={result.owner}
              language={result.language}
              stars={result.stargazers_count}
              description={result.description}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default App;
