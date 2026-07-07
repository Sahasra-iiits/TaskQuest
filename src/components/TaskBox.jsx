import React, { useState } from "react";

function TaskBox({ tasks, heading, removeTask, toggleTask, status }) {
  return (
    <>
      <h1 className="text-white mb-[10px] mt-[10px] text-lg">
        <b>{heading}</b>
      </h1>
      <div>
        {tasks
          .filter((t) => t.status == status)
          .map((t, index) => (
            <div
              key={index}
              className={
                t.status
                  ? "bg-[#b9ecb9] p-[15px] text-[#150e16] rounded-md m-[2px] flex flex-row justify-between border-[#008000] border-l-8"
                  : "bg-[#c3a7c8] p-[15px] text-[#150e16] rounded-md m-[2px] flex flex-row justify-between border-[#735678] border-l-8"
              }
            >
              <p>{t.task}</p>
              <div className="flex flex-row justify-between w-[170px] h-[25px]">
                <p className="bg-red-700 rounded-md text-white p-[3px] text-sm">
                  +${t.priority}XP
                </p>
                <input
                  type="checkbox"
                  checked={t.status}
                  onChange={() => toggleTask(t.task)}
                  className="w-[30px] cursor-pointer"
                />
                <p
                  onClick={() => removeTask(t.task)}
                  className="cursor-pointer text-red-700"
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default TaskBox;
