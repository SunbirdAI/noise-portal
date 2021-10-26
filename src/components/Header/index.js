import logo from '../../logo.svg';
import {Wrapper, LogoImg, Nav, NavList, ListItem} from "./Header.styles";

export default function Header() {
    const navItems = [
        {
            name: 'Home',
            link: '#',
            active: true
        },
        {
            name: 'Sensors',
            link: '#'
        },
        {
            name: 'Data',
            link: '#',
        },
        {
            name: 'Maps',
            link: '#'
        }
    ];
    const navListItems = navItems.map((item, index) =>
        <NavListItem {...item} key={index}/>
    );
    return (
        <Wrapper>
            <LogoImg src={logo} alt='Sunbird Logo'/>
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
            <a href={link}>{name}</a>
        </ListItem>
    );
}
