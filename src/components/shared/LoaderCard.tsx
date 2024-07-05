//LoaderCard.tsx
import { Skeleton } from "@/components/ui/skeleton";
interface ISize {
  width: string;
  height: string;
}
const LoaderCard = ({ width, height }: ISize) => {
  return (
    <>
      <Skeleton
        style={{ width: width, height: height }}
        className="rounded-md"
      />
    </>
  );
};
export default LoaderCard;
