import React from "react";
import TodoInput from "./TodoInput.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.scss";

toast.configure();

const TASKS = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

class ListTodo extends React.Component {
  state = {
    listTodos: TASKS,
    editTask: {},
    filterName: "ALL",
  };

  addNewTask = (task) => {
    this.setState({
      listTodos: [...this.state.listTodos, task],
    });
    toast.success("Add task successfully!");
    localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
  };

  handleShowAll = () => {
    this.setState({
      filterName: "ALL",
    });
  };

  handleShowDone = () => {
    this.setState({
      filterName: "DONE",
    });
  };

  handleShowTodo = () => {
    this.setState({
      filterName: "TODO",
    });
  };

  checkDoneTask = (taskId) => {
    let task = this.state.listTodos[taskId];
    task.isDone = !task.isDone;
    this.setState({
      listTodos: this.state.listTodos,
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
  };

  handleEditTask = (task) => {
    this.setState({
      editTask: task,
    });
  };

  handleEditTaskDone = (task) => {
    let { editTask, listTodos } = this.state;
    let isEmptyObj = Object.keys(editTask).length === 0;

    console.log("isEmptyObj: " + isEmptyObj);
    console.log("task id: " + task.id);

    if (isEmptyObj === false && editTask.id === task.id) {
      let listTodosClone = [...listTodos];
      let objIndex = listTodosClone.findIndex((item) => item.id === task.id);

      listTodosClone[objIndex].title = editTask.title;

      this.setState({
        listTodos: listTodosClone,
        editTask: {},
      });

      toast.success("Update Task Successfully!");
      localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
      return;
    }

    this.setState({
      editTask: task,
    });
  };

  handleCancelEditTask = (task) => {
    this.setState({
      editTask: task,
    });
  };

  handleDeleteTask = (task) => {
    let currentTask = this.state.listTodos;
    currentTask = currentTask.filter((item) => item.id !== task.id);
    this.setState({
      listTodos: currentTask,
    });
    toast.success("Delete successfully!");
    localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
  };

  handleDeleteDoneTask = () => {
    let currentTasks = [...this.state.listTodos];
    currentTasks = currentTasks.filter((item) => item.isDone === false);
    this.setState({
      listTodos: currentTasks,
    });
    toast.success("Delete successfully!");
    localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
  };

  handleDeleteAllTask = () => {
    this.setState({
      listTodos: [],
    });
    toast.success("Delete successfully!");
    localStorage.setItem("tasks", JSON.stringify(this.state.listTodos));
  };

  handleOnChangeTaskTitle = (event) => {
    let editTaskClone = { ...this.state.editTask };
    editTaskClone.title = event.target.value;
    this.setState({
      editTask: editTaskClone,
    });
  };

  render() {
    let { listTodos, editTask } = this.state;
    let isEmptyObj = Object.keys(editTask).length === 0;
    let filterState = { todos: [] };

    if (this.state.filterName === "ALL") {
      filterState.todos = listTodos;
    }

    if (this.state.filterName === "DONE") {
      filterState.todos = listTodos.filter((task) => task.isDone === true);
    }

    if (this.state.filterName === "TODO") {
      filterState.todos = listTodos.filter((task) => task.isDone === false);
    }

    return (
      <div className="list-todo-container">
        <TodoInput
          addNewTask={this.addNewTask}
          listTodos={this.state.listTodos}
        />
        <div className="filter-list-todo">
          <div className="todo-list-title">TodoList</div>
          <span>
            <button type="button" onClick={this.handleShowAll} className="btn">
              All
            </button>
          </span>
          <span>
            <button type="button" onClick={this.handleShowDone} className="btn">
              Done
            </button>
          </span>
          <span>
            <button type="button" onClick={this.handleShowTodo} className="btn">
              Todo
            </button>
          </span>
        </div>
        <div className="list-todo">
          {filterState.todos.map((todo) => {
            return (
              <div key={todo.id} className="list-todo-item">
                {isEmptyObj === true ? (
                  <>
                    <span
                      className={todo.isDone ? "completed" : "not-completed"}
                    >
                      {todo.title}
                    </span>
                  </>
                ) : (
                  <>
                    {editTask.id === todo.id ? (
                      <span>
                        <input
                          type="text"
                          value={editTask.title}
                          onChange={this.handleOnChangeTaskTitle}
                        />
                      </span>
                    ) : (
                      <span
                        className={todo.isDone ? "completed" : "not-completed"}
                      >
                        {todo.title}
                      </span>
                    )}
                  </>
                )}
                <> </>
                {isEmptyObj === false && editTask.id === todo.id ? (
                  <span className="actions">
                    {/* edit task */}
                    <span className="edits">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => this.handleEditTaskDone(todo)}
                      >
                        Edit
                      </button>
                    </span>
                    {/* cancel editing task */}
                    <span className="cancel">
                      <button
                        type="button"
                        className="btn"
                        onClick={this.handleCancelEditTask}
                      >
                        Cancel
                      </button>
                    </span>
                  </span>
                ) : (
                  <span className="actions">
                    <span className="checkboxes">
                      <input
                        type="checkbox"
                        checked={todo.isDone ? "checked" : ""}
                        onChange={() => this.checkDoneTask(todo.id)}
                      />
                    </span>
                    <span
                      className="edit"
                      onClick={() => this.handleEditTask(todo)}
                    >
                      <i className="fas fa-pen"></i>
                    </span>
                    <span
                      className="delete"
                      onClick={() => this.handleDeleteTask(todo)}
                    >
                      <i className="fas fa-trash"></i>
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="deletions">
          <span>
            <button type="button" onClick={this.handleDeleteDoneTask}>
              Delete done task
            </button>
          </span>
          <span>
            <button type="button" onClick={this.handleDeleteAllTask}>
              Delete all task
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default ListTodo;
