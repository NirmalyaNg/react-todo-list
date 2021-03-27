import React from "react";

const Todo = ({ value, deleteTodoHandler, id, editTodoHandler }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <h6>{value}</h6>
      <div className="todo-icons">
        <span className="text-success mr-4">
          <i className="fas fa-pen" onClick={() => editTodoHandler(id)}></i>
        </span>
        <span className="text-danger " onClick={() => deleteTodoHandler(id)}>
          <i className="fas fa-trash"></i>
        </span>
      </div>
    </li>
  );
};
export default Todo;
