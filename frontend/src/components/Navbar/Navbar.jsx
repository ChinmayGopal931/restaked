import { NavLink } from 'react-router-dom';
import StripeButton from '../Buttons/StripeButton'
import './Navbar.css';

export default function Navbar({ links }) {

    const activeStyle = { borderTop: '4px solid white' };

  return (
    <nav className="navbar navbar-dark fixed-top bg-dark navbar-expand-lg">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          {links.map((link) => (
            <li className="nav-item" key={link.title}>
              <NavLink 
                className="nav-link" 
                to={link.path}
                style={({ isActive }) => isActive ? activeStyle : {}}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
