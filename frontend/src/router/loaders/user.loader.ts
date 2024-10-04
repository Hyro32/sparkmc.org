import { Params, redirect } from 'react-router-dom';

export const userLoader = ({ params }: { params: Params<string> }) => {
  const userParam = params.user;

  if (userParam) {
    return [];
  }

  return redirect('/');
};
