//URLForm.tsx
import { Link2Icon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const URLForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [original_url, setOriginal_Url] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      navigate(`/dashboard?createNew=${original_url}`);
    } else {
      navigate(`/login?createNew=${original_url}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col md:flex-row">
        <div className="relative w-full grow">
          <Link2Icon className="absolute left-4 -translate-y-1/2 top-1/2" />
          <Input
            type="url"
            placeholder="Enter the link here"
            className="pl-10"
            value={original_url}
            onChange={(e) => setOriginal_Url(e.target.value)}
          />
        </div>
        <Button type="submit">Shorten Now!</Button>
      </form>
    </>
  );
};
export default URLForm;
