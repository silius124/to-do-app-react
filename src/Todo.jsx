import Header from "./Header";
import Page from "./Page";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function AddToDo() {
  const { id } = useParams();
  const [folder, setFolder] = useState({});
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let todoArray = [];

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    const found = todoList.find((f) => f.id === id);
    if (found) {
      setFolder(found);
    }
  }, [id]);

  function updateTodoList(newTodo) {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const update = todoList.map((todo) =>
      todo.id === id ? { ...todo, todo: newTodo } : todo
    );
    localStorage.setItem("todoList", JSON.stringify(update));
  }

  function handleChangeCheckbox(idTask) {
    const updateTodo = [...folder.todo];
    const findUpdateTodo = updateTodo.findIndex((todo) => todo.id === idTask);
    if (updateTodo[findUpdateTodo].value) {
      updateTodo[findUpdateTodo].done = !updateTodo[findUpdateTodo].done;
      setFolder({ ...folder, todo: updateTodo });
      updateTodoList(updateTodo);
      setMessage("");
    } else {
      setMessage("Нужно ввести значение");
      setTimeout(() => setMessage(""), 1000);
    }
  }
  function handleChangeText(idTask, value) {
    if (value.length >= 40) return;
    const updateTodo = [...folder.todo];
    const findUpdateTodo = updateTodo.findIndex((todo) => todo.id === idTask);
    updateTodo[findUpdateTodo].value = value;
    setFolder({ ...folder, todo: updateTodo });
    updateTodoList(updateTodo);
  }
  function handleClickAdd() {
    const updateTodo = [...folder.todo];
    updateTodo.push({ id: crypto.randomUUID(), value: "", done: false });
    setFolder({ ...folder, todo: updateTodo });
    updateTodoList(updateTodo);
  }
  function handleClickDelete(idTask) {
    const updateTodo = [...folder.todo];
    const findUpdateTodo = updateTodo.findIndex((todo) => todo.id === idTask);
    updateTodo.splice(findUpdateTodo, 1);
    setFolder({ ...folder, todo: updateTodo });
    updateTodoList(updateTodo);
  }
  function handleClickDeleteFolder() {
    setIsOpen(true);
  }
  if (!folder)
    return (
      <Page>
        <Header />
        <p>Папка не найдена</p>
      </Page>
    );
  todoArray = (folder.todo || []).map((task) => {
    return (
      <div
        key={task.id}
        className="flex items-center justify-between flex-col w-full"
      >
        <div className="flex items-center justify-between w-full h-15">
          <input
            className="size-5 mr-3"
            type="checkbox"
            checked={task.done}
            onChange={() => handleChangeCheckbox(task.id)}
          />
          {!task.done ? (
            <input
              className="py-2 w-90 text-center focus:border-2 outline-none"
              type="text"
              value={task.value}
              onChange={(e) => handleChangeText(task.id, e.target.value)}
              placeholder="Задача"
            />
          ) : (
            <label className="w-90 text-center ">
              <del>{task.value}</del>
            </label>
          )}
          <button
            className="ml-5 w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded hover:bg-red-800 duration-200 cursor-pointer"
            onClick={() => handleClickDelete(task.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0,0,256,256"
              fill="currentColor"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                //style="mix-blend-mode: normal"
              >
                <g transform="scale(2,2)">
                  <path d="M49,1c-1.66,0 -3,1.34 -3,3c0,1.66 1.34,3 3,3h30c1.66,0 3,-1.34 3,-3c0,-1.66 -1.34,-3 -3,-3zM24,15c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13h77v63c0,9.37 -7.63,17 -17,17h-40c-9.37,0 -17,-7.63 -17,-17v-52c0,-1.66 -1.34,-3 -3,-3c-1.66,0 -3,1.34 -3,3v52c0,12.68 10.32,23 23,23h40c12.68,0 23,-10.32 23,-23v-63.35937c5.72,-1.36 10,-6.50062 10,-12.64062c0,-7.17 -5.83,-13 -13,-13zM24,21h80c3.86,0 7,3.14 7,7c0,3.86 -3.14,7 -7,7h-80c-3.86,0 -7,-3.14 -7,-7c0,-3.86 3.14,-7 7,-7zM50,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3zM78,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3z"></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <label htmlFor="">{message ? message : ""}</label>
      </div>
    );
  });
  return (
    <Page>
      <Header />
      <div className="flex items-center justify-between max-w-lg mx-auto w-full mb-5">
        <h2 className="text-3xl text-center flex-1">{folder.name || "НЕА"}</h2>
        <button
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
          onClick={handleClickDeleteFolder}
        >
          Удалить папку
        </button>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl text-black flex flex-col justify-center">
              <h2 className="text-xl mb-4">Вы правда хотите удалить папку?</h2>

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mb-2 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  const todoList =
                    JSON.parse(localStorage.getItem("todoList")) || [];
                  const foundIndex = todoList.findIndex((f) => f.id === id);
                  todoList.splice(foundIndex, 1);
                  localStorage.setItem("todoList", JSON.stringify(todoList));
                  navigate(-1);
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

      <div className="max-w-lg w-full mx-auto">
        {todoArray}
        <button
          className="px-3 py-2 my-2 bg-cyan-500 text-white rounded hover:bg-cyan-800 duration-200 cursor-pointer"
          onClick={handleClickAdd}
        >
          Добавить
        </button>
      </div>
    </Page>
  );
}
