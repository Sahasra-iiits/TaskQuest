import React, { useState } from "react";

function Input({ addTask }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("High");

  function handleTasks() {
    addTask(newTask, priority);
    setNewTask("");
  }

  return (
    <div className="flex flex-row items-center justify-center mb-[20px] text-xs">
      <select
        name="Priority"
        onChange={(e) => setPriority(e.target.value)}
        className="p-[10px] h-[44px] bg-white border-black border-r-[1px]"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="p-[10px] h-[44px] w-[230px] text-[#150e16] bg-white border-white md:w-[330px] focus:outline-none focus:ring focus:border-blue-300 border-2"
      />

      <button
        onClick={handleTasks}
        className="text-white bg-[#643f41] h-[44px] w-[60px] text-4xl cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default Input;
