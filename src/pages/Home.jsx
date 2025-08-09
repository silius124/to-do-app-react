import Header from "../components/Header";
import Cards from "../components/CardsTodo";
import ButtonAdd from "../components/ButtonAddToDo";
import Page from "../components/Page";
import { useEffect, useState } from "react";

export default function Home() {
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todoList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleClickAdd({ name, describe, color }) {
    setTodoList([
      ...todoList,
      {
        id: crypto.randomUUID(),
        name: name,
        describe: describe,
        color: color,
        date: new Date(),
        todo: [{ id: crypto.randomUUID(), value: "", done: false }],
      },
    ]);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  return (
    <Page>
      <Header />
      <Cards todoList={todoList} />
      <ButtonAdd
        onClick={handleClickAdd}
        text="+"
        className="fixed bottom-4 right-2 lg:right-70 lg:bottom-50"
      />
    </Page>
  );
}
