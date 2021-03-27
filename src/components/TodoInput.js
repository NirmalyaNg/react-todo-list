import React from "react";

const TodoInput = ({ handleChange, value, addTodoHandler, editTodo }) => {
  let buttonName = editTodo ? "Edit Todo" : "Add Todo";
  return (
    <div className="card card-body">
      <form>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text bg-primary text-white">
              <i className="fas fa-book"></i>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Add a Todo Item"
            onChange={(e) => handleChange(e)}
            value={value}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-${
            editTodo ? "success" : "primary"
          } btn-block mt-3`}
          onClick={addTodoHandler}
        >
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
