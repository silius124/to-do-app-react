export default function Page({ children }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-4 flex flex-col items-center relative">
      {children}
    </div>
  );
}
