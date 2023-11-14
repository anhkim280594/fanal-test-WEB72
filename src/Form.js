import React, { useState } from "react";

const Form = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== "") {
      onAddTask(task);
      setTask("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter task ..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
