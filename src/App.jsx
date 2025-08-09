import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo/:id" element={<Todo />} />
    </Routes>
  );
}

export default App;
