//PageNotFound.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="py-6 text-center">
      <div className="text-center font-black text-6xl leading-normal mb-4">
        <span className="text-gradient">Page Not Found</span>
      </div>
      <Button variant={"secondary"} size={"lg"} asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </section>
  );
};
export default PageNotFound;
