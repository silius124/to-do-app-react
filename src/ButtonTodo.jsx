export default function ButtonTodo({ className, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`size-16 rounded-full bg-blue-600 hover:bg-blue-800 text-3xl text-white flex items-center justify-center cursor-pointer leading-none font-bold ${className}`}
    >
      {text}
    </button>
  );
}
