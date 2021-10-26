import styled from "styled-components";

export const Wrapper = styled.header`
  background: var(--navyBlue);
  color: var(--white);
  cursor: default;
  height: 4em;
  left: 0;
  line-height: 3.25em;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
`;


export const LogoImg = styled.img`
  height: 70%;
  line-height: inherit;
  position: absolute;
  margin: 0.5em;
  vertical-align: middle;
`;

export const Nav = styled.nav`
  height: inherit;
  line-height: inherit;
  position: absolute;
  right: 0.25em;
  top: 0;
  vertical-align: middle;
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

export const ListItem = styled.li`
  display: inline-block;
  padding-left: 0;

  a {
    color: var(--${({active}) => active ? 'lightOrange' : 'white'});
    display: inline-block;
    height: 2em;
    line-height: 17px;
    padding: 0 1em;
    border-radius: 6px;
    border: 0;
    text-decoration: none;
    font-size: var(--fontHeader);
    font-weight: 500;

    :hover {
      color: var(--lightOrange);
    }
  }
`;
