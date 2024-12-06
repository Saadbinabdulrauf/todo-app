"use client";

import { useState } from "react";

interface Todo {
  movie: string;
  id: number;
}

export default function Home() {
  // Define state
  const [todos, setTodos] = useState<Todo[]>([
    { movie: "Hangoor", id: 1 },
    { movie: "Aik hay nighar", id: 2 },
  ]);

  const [inputVal, setInput] = useState<string>("");
  const [id, setId] = useState<number | string>("");

  // Function to add or update item
  const addItem = () => {
    const existingTodo = todos.find((item) => item.id === Number(id));
    if (existingTodo) {
      const updatedTodos = todos.map((item) =>
        item.id === Number(id) ? { movie: inputVal, id: Number(id) } : item
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, { movie: inputVal, id: Number(id) }]);
    }

    setInput("");
    setId("");
  };

  // Function to edit item
  const editItem = (id: number) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setInput(todoToEdit.movie);
      setId(todoToEdit.id);
    }
  };

  // Function to delete item
  const delItem = (id: number) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };
return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-center text-[40px] underline">Todo App</h1>

      {/* Input Section */}
      <div className="flex justify-between gap-4 mt-5">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          className="w-[60%] p-2 ml-3 text-lg border-b focus:outline-none"
          placeholder="Write movie name"
        />
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-[20%] p-2 ml-3 text-lg border-b focus:outline-none"
          placeholder="Write ID"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-300 w-[20%] text-white p-2 rounded"
        >
          Add Movie
        </button>
      </div>

      {/* Movies List Section */}
      <h1 className="text-center text-[40px] underline mt-5">Movies List</h1>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {todos.map((item, index) => (
          <div className="shadow p-4" key={item.id}>
            <div className="flex justify-between text-lg">
              <span className="shadow rounded-full h-8 w-8 text-center my-auto">
                {index + 1}
              </span>
              <span
                onClick={() => delItem(item.id)}
                className="shadow rounded-full h-8 w-8 text-center my-auto cursor-pointer text-red-700"
              >
                x
              </span>
            </div>

            {/* Movie Details */}
            <div className="mt-5 text-[30px] text-gray-700">{item.movie}</div>
            <div>
              <h2
                onClick={() => editItem(item.id)}
                className="text-right cursor-pointer"
              >
                Edit
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}