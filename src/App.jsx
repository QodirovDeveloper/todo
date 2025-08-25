import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10">
      <img
        className="absolute top-0 right-0 left-0  -z-10 object-cover w-full h-[45%]"
        src="./bg.png"
        alt=""
      />
      <h1 className="text-5xl font-bold text-white mb-10">TODO</h1>

      <form
        onSubmit={addTodo}
        className="w-full flex justify-between bg-white rounded-[9px] max-w-md"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create a new todo..."
          className="flex-1 p-3 rounded-lg outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 sm:hidden  hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </form>

      <ul className="bg-white w-full max-w-md mt-6 rounded-lg shadow-lg">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                className={todo.completed ? "line-through text-gray-400" : ""}
              >
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="w-full max-w-md flex justify-between mt-4 ">
          <span>{todos.filter((t) => !t.completed).length} items left</span>
          <button onClick={clearCompleted} className="hover:underline">
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
