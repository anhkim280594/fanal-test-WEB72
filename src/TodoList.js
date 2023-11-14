import React, { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, onUpdateTaskStatus, showOnlyIncomplete }) => {
  const filteredTasks = showOnlyIncomplete ? tasks.filter(task => !task.completed) : tasks;

  return (
    <div className="todo-list-container">
      {filteredTasks.map((task, index) => (
        <div className={`todo-item-container ${task.completed ? "done" : ""}`} key={index}>
          <div
            className="item-done-button"
            onClick={() => onUpdateTaskStatus(index, !task.completed)}
          >
            {task.completed ? (
              <FaRegCheckCircle color="#9a9a9a" />
            ) : (
              <FaRegCircle color="#9a9a9a" />
            )}
          </div>
          <div className="item-title">{task.title}</div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
