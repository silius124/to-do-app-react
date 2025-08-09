import { useState } from "react";
import ButtonTodo from "../components/ButtonTodo";

export default function ButtonAdd({ className, onClick, text }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  function handleClickAdd() {
    setIsOpen(true);
  }
  return (
    <div>
      <ButtonTodo onClick={handleClickAdd} className={className} text={text} />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-black flex flex-col justify-center">
            <h2 className="text-xl mb-4">Добавление дела</h2>
            <div className="my-5 flex flex-col justify-center">
              <input
                className="p-3 mb-3"
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-3 mb-3"
                type="text"
                placeholder="Описание"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <div
                  className={`size-5 rounded-full bg-purple-500 cursor-pointer hover:bg-purple-800 ${
                    color === "purple" ? "ring-2 ring-black" : ""
                  }}`}
                  onClick={() => {
                    setColor("purple");
                  }}
                ></div>
                <div
                  className={`size-5 rounded-full bg-red-500 cursor-pointer hover:bg-red-800 ${
                    color === "red" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => {
                    setColor("red");
                  }}
                ></div>
                <div
                  className={`size-5 rounded-full bg-green-500 cursor-pointer hover:bg-green-800 ${
                    color === "green" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => {
                    setColor("green");
                  }}
                ></div>
                <div
                  className={`size-5 rounded-full bg-cyan-500 cursor-pointer hover:bg-cyan-800 ${
                    color === "cyan" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => {
                    setColor("cyan");
                  }}
                ></div>
                <div
                  className={`size-5 rounded-full bg-orange-500 cursor-pointer hover:bg-orange-800 ${
                    color === "orange" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => {
                    setColor("orange");
                  }}
                ></div>
                <div
                  className={`size-5 rounded-full bg-gray-800 cursor-pointer  ${
                    color === "gray" ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => {
                    setColor("gray");
                  }}
                ></div>
              </div>
            </div>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mb-2 cursor-pointer"
              onClick={() => {
                if (name !== "") {
                  onClick({ name, describe, color });
                  setColor("");
                  setName("");
                  setDescribe("");
                  setIsOpen(false);
                  setMessage("");
                } else {
                  setMessage("Нужно ввести название!");
                }
              }}
            >
              Добавить
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setColor("");
                setName("");
                setDescribe("");
                setMessage("");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Закрыть
            </button>
            <div className="text-red-500 font-bold">{message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
