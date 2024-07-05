//Landing.tsx
import URLForm from "@/components/shared/URLForm";
const Landing = () => {
  return (
    <section className="py-6">
      <h1 className=" text-center text-5xl font-black leading-normal">
        <span className="text-gradient inline-block">
          Shorten Your Loooong Links :)
        </span>
      </h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-center text-xl">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <URLForm />
      </div>
    </section>
  );
};
export default Landing;
