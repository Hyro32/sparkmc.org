import { Params, redirect } from 'react-router-dom';
import { ResourceTypes } from '../../types';

export const typeLoader = ({ params }: { params: Params<string> }) => {
  const typeParam = params.type;

  if (
    typeParam &&
    Object.values(ResourceTypes).includes(typeParam as ResourceTypes)
  ) {
    return [];
  }

  return redirect('/');
};
