import React from "react";

function Score({ score }) {
  return (
    <div className="text-white text-center text-5xl mt-[20px]">
      Score: {score}XP
    </div>
  );
}

export default Score;
