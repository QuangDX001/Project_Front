import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.scss";

class TodoInput extends React.Component {
  state = {
    title: "",
  };

  handleOnChangeTaskTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAddNewTask = () => {
    if (!this.state.title) {
      toast.configure();
      toast.error("Please select a title first!");
      return;
    }

    this.props.addNewTask({
      id: this.props.listTodos.length, // haven't set the rule to set id
      title: this.state.title,
      isDone: false,
    });

    this.setState({
      title: "",
    });
  };

  render() {
    return (
      <div className="add-todo">
        <div className="input-field">
          <span>
            <button type="button" className="btn btn-input">
              <i className="fas fa-book"></i>
            </button>
          </span>
          <span>
            <input
              type="text"
              placeholder="New Todo"
              value={this.state.title}
              onChange={this.handleOnChangeTaskTitle}
            />
          </span>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-add"
            onClick={this.handleAddNewTask}
          >
            Add new task
          </button>
        </div>
      </div>
    );
  }
}

export default TodoInput;
