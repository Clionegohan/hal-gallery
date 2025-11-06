const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-black/80
                       backdrop-blur-md px-4 py-3 text-zinc-400 text-sm"
    >
      <div>© {new Date().getFullYear()} hal gallery</div>
    </footer>
  );
};

export default Footer;
