import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hjem</Link>
        </li>
        <li>
          <Link to="/UserPage">User Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;