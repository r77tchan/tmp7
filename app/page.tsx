"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-semibold">Todo</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded border border-zinc-300 px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) addTodo();
          }}
          placeholder="やることを入力"
        />
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={addTodo}
        >
          追加
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex cursor-pointer items-center gap-2 rounded border border-zinc-200 px-3 py-2"
            onClick={() => toggleTodo(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.done}
              readOnly
              className="pointer-events-none"
            />
            <span
              className={`flex-1 ${todo.done ? "text-zinc-400 line-through" : ""}`}
            >
              {todo.text}
            </span>
            <button
              className="text-sm text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
