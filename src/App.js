import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }

    const urlParams = new URLSearchParams(location.search);
    const withDoneParam = urlParams.get("withDone");
    setShowOnlyIncomplete(withDoneParam !== "1");
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { title: newTask, completed: false }]);
  };

  const updateTaskStatus = (index, completed) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = completed;
    setTasks(updatedTasks);
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const handleCheckboxToggle = () => {
    navigate(`?withDone=${showOnlyIncomplete ? "1" : "0"}`);
  };

  return (
    <div className="App">
      <div className="container">
      <TodoListHeader remainingTasks={remainingTasks}/>
        <label>
          <input
            type="checkbox"
            checked={showOnlyIncomplete}
            onChange={() => {
              setShowOnlyIncomplete(!showOnlyIncomplete);
              handleCheckboxToggle();
            }}
          />
         Chưa hoàn thành
        </label>
        <TodoList
          tasks={tasks}
          onUpdateTaskStatus={updateTaskStatus}
          showOnlyIncomplete={showOnlyIncomplete}
        />
        <Form onAddTask={addTask} />
      </div>
      <Footer />
    </div>
  );
};