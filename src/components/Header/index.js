import logo from '../../logo.svg';
import {Wrapper, LogoImg, Nav, NavList, ListItem} from "./Header.styles";
import {Link, useLocation} from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const navItems = [
        {
            name: 'Home',
            link: '/noise-portal',
            active: location.pathname === '/noise-portal'
        },
        {
            name: 'Sensors',
            link: '/noise-portal/sensors',
            active: location.pathname === '/noise-portal/sensors'
        },
        {
            name: 'Data',
            link: '/noise-portal/data',
            active: location.pathname === '/noise-portal/data'
        },
        {
            name: 'Maps',
            link: '/noise-portal/maps',
            active: location.pathname === '/noise-portal/maps'
        }
    ];
    const navListItems = navItems.map((item, index) =>
        <NavListItem {...item} key={index}/>
    );
    return (
        <Wrapper>
            <Link to='/'>
                <LogoImg src={logo} alt='Sunbird Logo'/>
            </Link>
            <Nav>
                <NavList>
                    {navListItems}
                </NavList>
            </Nav>
        </Wrapper>
    );
}

function NavListItem({name, link, active}) {
    return (
        <ListItem active={active}>
            <Link to={link}>
                {name}
            </Link>
        </ListItem>
    );
}
