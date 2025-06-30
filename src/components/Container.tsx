export const Container = ({
  children,
  isDisabled = false,
}: {
  children: React.ReactNode;
  isDisabled?: boolean;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          ⚔️ REVI ARENA ⚔️
        </h1>

        <div
          className={
            !isDisabled ? "grid grid-cols-2" : "grid grid-cols-1"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};
