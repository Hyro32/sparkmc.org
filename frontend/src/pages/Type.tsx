import { useLoaderData } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { PlusCard } from '../components/cards/PlusCard';
import { ResourceCard } from '../components/cards/ResourceCard';
import { Resource } from '../types';
import { SearchBar } from '../components/SearchBar';

export const Type = () => {
  const resources = useLoaderData() as Resource[];

  resources.push({
    url: 'test-url',
    author: 'Hyro32',
    type: 'plugin',
    title: 'Test Title',
    description: 'Test Description',
    downloads: 0,
    about: 'Test About',
    tags: ['test', 'tags'],
    api_version: '1.20',
    updated_at: new Date(),
    created_at: new Date(),
  });

  return (
    <Layout>
      <div className="flex items-start justify-between w-full gap-10">
        <div className="w-1/4">
          <PlusCard />
        </div>
        <div className="flex flex-col w-3/4 space-y-8">
          <SearchBar resources={resources} />
          <ul className="flex flex-col gap-4">
            {resources.map((resource: Resource) => (
              <li key={resource.url}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};
