import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-center items-center">
        <li className="mx-4">
          <Link to="/" className="text-white hover:text-blue-200 font-bold py-2 px-4 rounded">
            Hjem
          </Link>
        </li>
        <li className="mx-4">
          <Link to="/UserPage" className="text-white hover:text-blue-200 font-bold py-2 px-4 rounded">
            User Page
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

