import Fuse, { FuseResult } from 'fuse.js';
import { useState } from 'react';
import { Resource } from '../types';

export const useSearchBar = () => {
  const [hits, setHits] = useState<FuseResult<Resource>[]>([]);

  const resourcesOptions = {
    includeScore: true,
    keys: ['title'],
  };

  function search(resources: Resource[], value: string) {
    const fuse = new Fuse(resources, resourcesOptions);
    if (resources.length === 0) return;
    const result = fuse.search(value);
    setHits(result);
  }

  return {
    hits,
    setHits,
    search,
  };
};
