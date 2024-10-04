import { Params, redirect } from 'react-router-dom';

export const resourceLoader = ({ params }: { params: Params<string> }) => {
  const resourceParam = params.resource;

  if (resourceParam) {
    return [];
  }

  return redirect('/');
};
