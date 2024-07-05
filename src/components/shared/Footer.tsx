const Footer = () => {
  return (
    <footer className="p-3">
      <div className="container mx-auto px-4 text-sm text-center">
        &copy; {new Date().getFullYear()} All rights reserved. Design & Develop
        by{" "}
        <a
          href="http://www.sachindesai.in"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          Sachin Desai
        </a>
      </div>
    </footer>
  );
};
export default Footer;
