import { createBrowserRouter } from 'react-router-dom';
import { Home, Resource, Type, User } from '../pages';
import { resourceLoader, typeLoader, userLoader } from './loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: ':type',
    element: <Type />,
    loader: typeLoader,
  },
  {
    path: ':type/:resource',
    element: <Resource />,
    loader: resourceLoader,
  },
  {
    path: ':user',
    element: <User />,
    loader: userLoader,
  },
]);
