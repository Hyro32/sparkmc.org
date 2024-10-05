import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { ResourceTag } from '../ResourceTag';
import { LuHeart, LuPackageCheck, LuSave, LuCalendar } from 'react-icons/lu';
import { integerSuffix } from '../../utils/integerSuffix';

export const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Link
      to={`/${resource.type}/${resource.url}`}
      className="flex items-center justify-between w-full p-3 rounded-md bg-neutral-800"
    >
      <div className="flex items-center gap-4">
        <img
          src={resource.icon ?? 'https://via.placeholder.com/150'}
          alt={resource.url}
          className="w-24 h-24 rounded-md"
        />
        <div className="flex flex-col gap-5 h-full">
          <div>
            <h2 className="text-lg font-normal">{resource.title}</h2>
            <p className="text-sm text-neutral-500">{resource.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {resource.tags.map((tag) => (
              <ResourceTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-evenly text-sm">
        <span className="flex items-center gap-2">
          <LuPackageCheck />
          {integerSuffix(resource.downloads)} downloads
        </span>
        <span className="flex items-center gap-2">
          <LuHeart />
          {integerSuffix(resource.likes?.length ?? 0)} likes
        </span>
        <span className="flex items-center gap-2">
          <LuCalendar />
          {resource.created_at.toLocaleDateString()}
        </span>
        <span className="flex items-center gap-2">
          <LuSave />
          {resource.updated_at.toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};
