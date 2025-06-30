import { cn } from "@/lib/utils";

export const Card = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={
      cn("bg-white rounded-lg shadow-xl p-4 border border-gray-200", className)
    }>{children}</div>
  );
};
