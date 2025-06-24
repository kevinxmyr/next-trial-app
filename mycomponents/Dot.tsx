interface DotProps {
  color: string;
  size: string; // TAILWIND SIZE
}

export const Dot = ({ color, size }: DotProps) => {
  return <div className={`w-${size} h-${size} animate-pulse rounded-full bg-${color}-500`} />;
};
