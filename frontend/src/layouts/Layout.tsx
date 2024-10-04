export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <main className="mx-auto w-[90%] max-w-6xl">{children}</main>
    </div>
  );
};
