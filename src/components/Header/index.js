import {Brand, BrandWrapper, Links, Nav, NavItem} from "./Header.styles";
import {Link} from "react-router-dom";

const Header = () => (
    <Nav>
        <BrandWrapper>
            <Brand>Sunbird AI Noise Dashboard</Brand>
        </BrandWrapper>
        <Links>
            <NavItem>
                <Link to='/'>Home</Link>
            </NavItem>
            <NavItem>
                <Link to='/analysis'>Analysis</Link>
            </NavItem>
        </Links>
    </Nav>
);

export default Header;
// import logo from '../../logo.svg';
// import {Wrapper, LogoImg, Nav, NavList, ListItem} from "./Header.styles";
// import {Link, useLocation} from "react-router-dom";
//
// export default function Header() {
//     const location = useLocation();
//     const navItems = [
//         {
//             name: 'Home',
//             link: '/',
//             active: location.pathname === '/'
//         },
//         {
//             name: 'Sensors',
//             link: '/sensors',
//             active: location.pathname === '/sensors'
//         },
//         {
//             name: 'Data',
//             link: '/data',
//             active: location.pathname === '/data'
//         },
//         {
//             name: 'Maps',
//             link: '/maps',
//             active: location.pathname === '/maps'
//         }
//     ];
//     const navListItems = navItems.map((item, index) =>
//         <NavListItem {...item} key={index}/>
//     );
//     return (
//         <Wrapper>
//             <Link to='/'>
//                 <LogoImg src={logo} alt='Sunbird Logo'/>
//             </Link>
//             <Nav>
//                 <NavList>
//                     {navListItems}
//                 </NavList>
//             </Nav>
//         </Wrapper>
//     );
// }
//
// function NavListItem({name, link, active}) {
//     return (
//         <ListItem active={active}>
//             <Link to={link}>
//                 {name}
//             </Link>
//         </ListItem>
//     );
// }
