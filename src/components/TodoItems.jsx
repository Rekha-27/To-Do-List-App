import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
function TodoItems({ text, id, isComplete, dltTodo, toggle }) {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt="image not found"
          className="w-7"
        />
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <img
        className="w-3.5 cursor-pointer"
        src={delete_icon}
        alt="image not found"
        onClick={() => dltTodo(id)}
      />
    </div>
  );
}

export default TodoItems;
