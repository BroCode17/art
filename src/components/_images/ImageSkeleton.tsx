import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const ImageSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn(
        `h-full w-full bg-gray-200 animate-pulse rounded-lg`,
        className
      )}
    />
  );
};

export default ImageSkeleton;
