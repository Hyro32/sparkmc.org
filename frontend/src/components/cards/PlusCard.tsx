import { Link } from 'react-router-dom';

export const PlusCard = () => {
  return (
    <div className="flex flex-col justify-between w-full h-56 p-5 rounded-md bg-neutral-800">
      <h2 className="text-2xl font-normal">80% goes for the creators!</h2>
      <Link
        to="/plus"
        className="text-purple-400 text-sm duration-300 hover:text-purple-600"
      >
        Enchance your experience and help your favourite creators! Go plus+
      </Link>
    </div>
  );
};
