const ShinyButton = ({ children, className, text, onClick, inset="full" }) => {
  return (
    <button
      className={`relative group overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children || text}
      <div className={`absolute top-0 -inset-${inset} h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine`} />
    </button>
  );
};
export default ShinyButton;
