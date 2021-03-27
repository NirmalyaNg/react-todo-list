import React from "react";
import Todo from "./Todo";

const TodoList = ({
  items,
  isClearable,
  clearTodosHandler,
  deleteTodoHandler,
  editTodoHandler,
}) => {
  const todos = items.map((item) => (
    <Todo
      key={item.id}
      value={item.value}
      id={item.id}
      deleteTodoHandler={deleteTodoHandler}
      editTodoHandler={editTodoHandler}
    />
  ));

  return (
    <ul className="list-group">
      <h3 className="text-center mt-2">List Group</h3>

      {todos}

      <button
        className={`btn btn-danger btn-block mt-3 ${
          isClearable ? "" : "disabled"
        }`}
        onClick={clearTodosHandler}
      >
        Clear List
      </button>
    </ul>
  );
};

export default TodoList;
