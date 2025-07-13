
export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl font-medium transition-colors duration-200
        bg-primary text-primary-foreground hover:bg-opacity-90
        focus:outline-none focus:ring-2 focus:ring-primary
        ${className}
      `}
    >
      {children}
    </button>
  );
}
