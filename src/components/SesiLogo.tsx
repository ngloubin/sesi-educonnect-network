
import { cn } from "@/lib/utils";

interface SesiLogoProps {
  className?: string;
}

const SesiLogo: React.FC<SesiLogoProps> = ({ className }) => {
  return (
    <svg 
      className={cn("h-7 w-auto", className)} 
      viewBox="0 0 100 50" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 10C9.2 10 5 14.2 5 19.5v11C5 35.8 9.2 40 14.5 40h71c5.3 0 9.5-4.2 9.5-9.5v-11c0-5.3-4.2-9.5-9.5-9.5h-71z"
        fill="#E3000F"
      />
      <path
        d="M25.2 20.8c0-1.7 1-2.5 2.8-2.5h5.2v3h-4.3v1.6h3.8v2.8h-3.8v1.7h4.5v2.8h-5.6c-1.7 0-2.6-0.9-2.6-2.5v-6.9zm12.1-2.5h3.3c1.8 0 2.8 0.8 2.8 2.5v6.9c0 1.6-0.9 2.5-2.6 2.5h-3.5c-1.7 0-2.6-0.9-2.6-2.5v-6.9c0-1.7 1-2.5 2.6-2.5zm0.2 3v5.8h3v-5.8h-3zm9.2-3h3.3c1.8 0 2.8 0.8 2.8 2.5v6.9c0 1.6-0.9 2.5-2.6 2.5h-3.5c-1.7 0-2.6-0.9-2.6-2.5v-6.9c0-1.7 1-2.5 2.6-2.5zm0.2 3v5.8h3v-5.8h-3zm9.2-3h3.3c1.8 0 2.8 0.8 2.8 2.5v6.9c0 1.6-0.9 2.5-2.6 2.5h-3.5c-1.7 0-2.6-0.9-2.6-2.5v-6.9c0-1.7 1-2.5 2.6-2.5zm0.2 3v5.8h3v-5.8h-3z"
        fill="white"
      />
    </svg>
  );
};

export default SesiLogo;
