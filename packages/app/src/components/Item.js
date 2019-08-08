import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import colors from "../colors.json";

const StyledItem = styled.a`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 2px solid hsl(210, 23%, 95%);
  box-sizing: border-box;
  padding: 16px 8px;
  text-decoration: none;
  color: black;
  background-color: #fff;

  :hover {
    cursor: pointer;
    background-color: #d9e2ec;
  }
`;

const Name = styled.div`
  color: #102a43;
  font-weight: 600;
  flex: 2;
`;

const Description = styled.div`
  color: #829ab1;
  flex: 1;
  margin-top: 8px;
`;

const Avatar = styled.img`
  width: 25px;
  border-radius: 50%;
  margin-right: 4px;
`;

const Owner = styled.div`
  color: #102a43;
  display: flex;
  align-items: center;
  color: dark-gray;
  flex: 2;
`;

const Language = styled.div`
  color: #829ab1;
  display: flex;
  flex: 1;
  align-items: center;
`;

const LanguageAccent = styled.div`
  height: 16px;
  margin-right: 4px;
  border: 1px solid
    ${props => (colors[props.language] ? colors[props.language].color : "")};
`;

const Stars = styled.div`
  color: #829ab1;
  display: flex;
  font-weight: 300;
  flex: 0;
  min-width: 80px;
  align-items: center;
  padding-left: 8px;
`;

const Item = props => (
  <StyledItem href={props.url} target="__blank">
    <div
      css={css`
        display: flex;
        flex: 1;
        align-items: center;
        @media (max-width: 425px) {
          flex-direction: column;
          align-items: flex-start;
        }
      `}
    >
      <Name>{props.name}</Name>
      <div
        css={css`
          display: flex;
          flex: 3;
          @media (max-width: 425px) {
            display: flex;
            flex: 1;
            justify-content: space-between;
            width: 100%;
            margin-top: 16px;
          }
        `}
      >
        {props.owner && (
          <Owner>
            <Avatar src={props.owner.avatar_url} alt="" />
            <div>{props.owner.login}</div>
          </Owner>
        )}
        <Language>
          {props.language && <LanguageAccent language={props.language} />}
          {props.language}
        </Language>
        <Stars>
          <FontAwesomeIcon
            css={css`
              color: #0e7c86;
              font-size: 12px;
              margin-right: 8px;
            `}
            icon={faStar}
          />
          {props.stars}
        </Stars>
      </div>
    </div>
    <Description>{props.description}</Description>
  </StyledItem>
);

Item.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  owner: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string
  }),
  language: PropTypes.string,
  stars: PropTypes.number,
  description: PropTypes.string
};

export default Item;
