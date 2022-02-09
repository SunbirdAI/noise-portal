import tw, {styled} from "twin.macro";

export const Nav = styled.nav`
    ${tw`
        flex
        items-center
        justify-between
        flex-wrap
        bg-sunbird-navy-blue
        p-6
    `}
`;

export const BrandWrapper = styled.div`
    ${tw`
        flex
        items-center
        flex-shrink-0
        text-white
        mr-6
    `}
`;

export const Brand = styled.span`
    ${tw`
        font-semibold
        text-2xl
        tracking-tight
    `}
`;

export const Links = styled.div`
    ${tw`
        text-white
        space-x-8
    `}
`;

export const NavItem = styled.span`
    ${tw`
        hover:text-sunbird-light-orange
    `}
`;

// import styled from "styled-components";
//
// export const Wrapper = styled.header`
//   background: var(--navyBlue);
//   color: var(--white);
//   cursor: default;
//   height: 4em;
//   left: 0;
//   line-height: 4em;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 10000;
//   padding: 0 20px;
// `;
//
// export const LogoImg = styled.img`
//   height: 70%;
//   line-height: inherit;
//   position: absolute;
//   margin: 0.5em;
//   vertical-align: middle;
// `;
//
// export const Nav = styled.nav`
//   height: inherit;
//   line-height: inherit;
//   position: absolute;
//   right: 0.25em;
//   top: 0;
//   vertical-align: middle;
// `;
//
// export const NavList = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding-left: 0;
// `;
//
// export const ListItem = styled.li`
//   display: inline-block;
//   padding-left: 0;
//
//   a {
//     color: var(--${({active}) => active ? 'lightOrange' : 'white'});
//     display: inline-block;
//     height: 2em;
//     line-height: 17px;
//     padding: 0 1em;
//     border-radius: 6px;
//     border: 0;
//     text-decoration: none;
//     font-size: var(--fontHeader);
//     font-weight: 500;
//
//     :hover {
//       color: var(--lightOrange);
//     }
//   }
// `;
