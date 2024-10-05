import { Link } from 'react-router-dom';
import { ResourceTypes } from '../types';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <img src="/vite.svg" alt="logo" />
      <ul className="flex items-center gap-6">
        {Object.values(ResourceTypes).map((type: string) => (
          <li key={type}>
            <Link to={`/${type}`}>
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
      <button>Login</button>
    </nav>
  );
};
