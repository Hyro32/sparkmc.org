import { Navbar } from '../components/Navbar';
import '@fontsource-variable/rubik';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full py-8 font-rubik">
      <main className="mx-auto w-[90%] max-w-6xl space-y-14">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
