import { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Input from "./components/Input";
import TaskBox from "./components/TaskBox";
import Footer from "./components/Footer";
import Score from "./components/Score";

function App() {
  const [tasks, setTasks] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const prevTasks = localStorage.getItem("tasks");
    if (prevTasks) setTasks(JSON.parse(prevTasks));
  }, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status == true) total = total + tasks[i].priority;
    }
    setScore(total);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask, priority) {
    const pri_val = priority == "High" ? 30 : priority == "Medium" ? 20 : 10;
    const taskobj = { task: newTask, priority: pri_val, status: false };
    setTasks([...tasks, taskobj]);
  }

  function toggleTask(taskName) {
    setTasks(
      tasks.map((task) =>
        task.task === taskName ? { ...task, status: !task.status } : task,
      ),
    );
  }

  function removeTask(task) {
    setTasks(tasks.filter((t) => t.task != task));
  }

  return (
    <>
      <Title />
      <Input addTask={addTask} />
      <p className="mb-[50px] text-center text-white md:text-base text-sm">
        High +30XP | Medium +20XP | Low +10XP
      </p>
      <TaskBox
        tasks={tasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
        heading={"Pending Tasks"}
        status={false}
      />
      <TaskBox
        tasks={tasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
        heading={"Completed Tasks"}
        status={true}
      />
      <Score score={score} />
      <Footer />
    </>
  );
}

export default App;
