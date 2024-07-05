//FilterInput.tsx
import { Filter } from "lucide-react";
import { Input } from "../ui/input";

interface FilterInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput = ({ value, onChange }: FilterInputProps) => {
  return (
    <div className="relative mt-3">
      <Input placeholder="Filter links..." value={value} onChange={onChange} />
      <Filter
        className="absolute right-3 -translate-y-1/2 top-1/2"
        strokeWidth={1}
        size={20}
      />
    </div>
  );
};

export default FilterInput;
