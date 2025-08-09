import { useNavigate } from "react-router-dom";

export default function Cards({ todoList }) {
  return (
    <div className=" w-full flex flex-wrap gap-5 justify-start ">
      {todoList.map((card) => {
        return <Card key={card.id} todoCard={card} />;
      })}
    </div>
  );
}

function Card({ todoCard }) {
  const navigate = useNavigate();
  const mounths = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентрября",
    "октября",
    "ноября",
    "декабря",
  ];
  let dateNorm = new Date(todoCard.date);
  const bgColor =
    {
      purple: "bg-purple-500 hover:bg-purple-800",
      red: "bg-red-500 hover:bg-red-800",
      green: "bg-green-500 hover:bg-green-800",
      cyan: "bg-cyan-500 hover:bg-cyan-800",
      orange: "bg-orange-500 hover:bg-orange-800",
      gray: "bg-gray-900 hover:bg-gray-950",
    }[todoCard.color] || "bg-gray-500 hover:bg-gray-800";
  return (
    <div
      onClick={() => navigate(`/todo/${todoCard.id}`)}
      className={`w-full lg:size-58 ${bgColor} p-4 rounded-2xl flex flex-col justify-between items-start text-white text-2xl gap-5  duration-300 cursor-pointer`}
    >
      <h2>{todoCard.name}</h2>
      <span>{todoCard.describe}</span>
      <span className="text-base text-gray-300 align-self-end">
        Дата создания: {dateNorm.getDate()} {mounths[dateNorm.getMonth()]}{" "}
        {dateNorm.getFullYear()} {dateNorm.getHours()}:{dateNorm.getMinutes()}:
        {dateNorm.getSeconds()}
      </span>
    </div>
  );
}
