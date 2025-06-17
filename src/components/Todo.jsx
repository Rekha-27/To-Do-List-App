import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
function Todo() {
  //Because useState keeps everything in JavaScript memory, and once the page reloads, that memory is cleared — your todo list resets to an empty list (unless rehydrated from localStorage).
  const [todoitems, setTodoitems] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );
  const inputref = useRef();
  const add = () => {
    const inputtext = inputref.current.value.trim();
    if (inputtext === " ") return null;
    const newtodo = {
      id: Date.now(),
      text: inputtext,
      isComplete: false,
    };
    setTodoitems((prev) => [...prev, newtodo]);
    inputref.current.value = "";
  };
  const dltTodo = (id) => {
    setTodoitems((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  const toggle = (id) => {
    setTodoitems((prevtodo) => {
      return prevtodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  //That’s great – this loads saved todos once on page load.
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoitems));
  }, [todoitems]);
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-5 gap-2">
        <img className="w-8" src={todo_icon} alt="image not found" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
          ref={inputref}
        />
        <button
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
          onClick={add}
        >
          ADD +
        </button>
      </div>
      <div>
        {todoitems.map((todo, index) => {
          return (
            <TodoItems
              text={todo.text}
              key={index}
              id={todo.id}
              isComplete={todo.isComplete}
              dltTodo={dltTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
