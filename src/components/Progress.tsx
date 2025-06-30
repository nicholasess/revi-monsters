export const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[500px] max-w-full px-4">
        <div
          className="bg-gradient-to-r from-red-500 to-green-500 h-4 rounded-full transition-all duration-500 shadow-lg"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #10b981, #22c55e)",
          }}
        />
      </div>
      <p className="mt-2 text-gray-600 text-lg animate-pulse">
        <span className="animate-pulse brightness-[1.2]">Carregando...</span>
      </p>
    </div>
  );
};
