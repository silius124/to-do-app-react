import { useState } from "react";
import ButtonTodo from "./ButtonTodo";

export default function ButtonDelete({ className, onClick, text }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClickAdd() {
    setIsOpen(true);
  }
  return (
    <div>
      <ButtonTodo onClick={handleClickAdd} className={className} text={text} />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-black flex flex-col justify-center">
            <h2 className="text-xl mb-4">Вы правда хотите удалить все дела?</h2>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mb-2 cursor-pointer"
              onClick={() => {
                onClick();
                setIsOpen(false);
              }}
            >
              Да
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Нет
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
