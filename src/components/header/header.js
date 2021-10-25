import logo from '../../logo.svg';
import './header.css';

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
    return (
        <header id="header" className="alt">
            <img src={logo} alt="Sunbird Logo"/>
            <nav id="nav">
                <NavList items={navItems}/>
            </nav>
        </header>
    );
}

function NavList({items}) {
    const navListItems = items.map((item, index) => <NavListItem {...item} key={index}/>);
    return (
        <ul>
            {navListItems}
        </ul>
    );
}

function NavListItem({name, link, active}) {
    return (
        <li className={active ? 'active' : ''}>
            <a href={link}>{name}</a>
        </li>
    );
}
