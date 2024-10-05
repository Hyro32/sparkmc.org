import { IoIosSearch } from 'react-icons/io';
import { Resource } from '../types';
import { useSearchBar } from '../hooks/useSearchBar';

export const SearchBar = ({ resources }: { resources: Resource[] }) => {
  const { search } = useSearchBar();

  return (
    <div className="flex items-center gap-3 border-2 border-neutral-600 bg-neutral-700 p-2 rounded-md">
      <IoIosSearch className="size-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for resources"
        className="w-full bg-transparent focus:outline-none"
        maxLength={60}
        onChange={(event) => search(resources, event.target.value)}
      />
    </div>
  );
};
