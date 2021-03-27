import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { v1 as uuid } from "uuid";

class App extends React.Component {
  // Initialising State
  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      todoValue: "",
      count: 0,
      editTodo: false,
      editTodoId: null,
    };
  }

  // Updating state from local Storage
  componentDidMount() {
    let items = JSON.parse(localStorage.getItem("items"));
    if (items != null) {
      this.setState({
        todoItems: items,
        count: items.length,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      todoValue: e.target.value,
    });
  };

  //------------------------------------------------------------------------------------------

  addTodoHandler = (e) => {
    e.preventDefault();

    // Edit Item
    if (this.state.editTodoId && this.state.todoValue.trim()) {
      let updatedItems = this.state.todoItems.map((item) => {
        if (item.id === this.state.editTodoId) {
          return {
            id: this.state.editTodoId,
            value: this.state.todoValue,
          };
        } else {
          return item;
        }
      });
      this.setState(
        (oldState) => ({
          todoItems: updatedItems,
          editTodoId: null,
          editTodo: false,
          todoValue: "",
        }),
        //Update in local storage also
        () => {
          localStorage.setItem("items", JSON.stringify(this.state.todoItems));
        }
      );
    } else {
      // Add Item
      this.state.todoValue.trim() &&
        this.setState(
          (oldState) => {
            let items = [...oldState.todoItems];
            items.push({
              id: uuid(),
              value: oldState.todoValue,
            });
            let newCount = (oldState.count += 1);

            return {
              todoItems: items,
              todoValue: "",
              count: newCount,
            };
          },
          // Add in local storage
          () => {
            localStorage.setItem("items", JSON.stringify(this.state.todoItems));
          }
        );
    }
  };
  //------------------------------------------------------------------------------------------------

  clearTodosHandler = () => {
    this.setState(
      (oldState) => ({
        todoItems: [],
        count: 0,
        editTodo: null,
        todoValue: "",
      }),
      () => {
        localStorage.setItem("items", JSON.stringify([]));
      }
    );
  };

  //--------------------------------------------------------------------------------------------------

  deleteTodoHandler = (id) => {
    let updatedItems = this.state.todoItems.filter((item) => item.id !== id);

    this.setState(
      (oldState) => ({
        todoItems: updatedItems,
        count: oldState.count - 1,
      }),
      () => {
        localStorage.setItem("items", JSON.stringify(this.state.todoItems));
      }
    );
  };

  //---------------------------------------------------------------------------------------------------

  editTodoHandler = (id) => {
    const todoEdit = this.state.todoItems.find((item) => item.id === id);
    // Setting the edittodoid
    this.setState({
      todoValue: todoEdit.value,
      editTodo: true,
      editTodoId: id,
    });
  };

  //---------------------------------------------------------------------------------------------------
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-6 mx-auto mt-4">
            <h3 className="text-center">Todo Input</h3>
            <TodoInput
              handleChange={this.handleChange}
              value={this.state.todoValue}
              addTodoHandler={this.addTodoHandler}
              editTodo={this.state.editTodo}
            />
            <TodoList
              items={this.state.todoItems}
              isClearable={this.state.count}
              clearTodosHandler={this.clearTodosHandler}
              deleteTodoHandler={this.deleteTodoHandler}
              editTodoHandler={this.editTodoHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
