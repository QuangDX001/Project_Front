import React from "react";

class AddComponent extends React.Component {
  state = {
    title: "",
    salary: "",
    age: "",
    address: "",
  };

  handleOnChangeJobTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleOnChangeSalary = (event) => {
    this.setState({
      salary: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title || !this.state.salary) {
      alert("Please enter a title and a salary!");
      return;
    }

    this.props.addNewJob({
      id: Math.floor(Math.random() * 1001),
      title: this.state.title,
      salary: this.state.salary,
    });

    this.setState({
      title: "",
      salary: "",
    });
  };

  render() {
    return (
      <>
        <form action="/action_page.php">
          <label htmlFor="jobTitle">Job Title:</label>
          <br />
          <input
            type="text"
            id="jobTitle"
            value={this.state.title}
            onChange={this.handleOnChangeJobTitle}
          />
          <br />
          <label htmlFor="salary">Salary:</label>
          <br />
          <input
            type="text"
            id="salary"
            value={this.state.salary}
            onChange={this.handleOnChangeSalary}
          />
          <br />
          <br />
          <input type="submit" value="Submit" onClick={this.handleOnSubmit} />
        </form>
      </>
    );
  }
}

export default AddComponent;
