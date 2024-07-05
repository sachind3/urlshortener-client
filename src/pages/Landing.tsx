//Landing.tsx
import URLForm from "@/components/shared/URLForm";
import BANNER from "@/assets/banner.png";
const Landing = () => {
  return (
    <section className="py-6">
      <h1 className="text-center text-5xl font-black md:leading-normal mb-6 md:mb-2">
        <span className="text-gradient inline-block">
          Shorten Your Loooong Links :)
        </span>
      </h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-center md:text-xl">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <URLForm />
      </div>
      <div className="text-center mt-10">
        <img src={BANNER} alt="banner" className="inline-block" />
      </div>
    </section>
  );
};
export default Landing;
