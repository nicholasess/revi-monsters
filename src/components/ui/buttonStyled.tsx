import { cn } from "@/lib/utils";

export const ButtonStyled = ({
  children,
  className = "",
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200`,
        disabled ? "opacity-50 cursor-not-allowed" : ""
        , className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
