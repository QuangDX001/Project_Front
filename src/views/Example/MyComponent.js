import React from "react";
import ChildComponent from "./ChildComponent.js";
import AddComponent from "./AddComponent.js";

class MyComponent extends React.Component {
  state = {
    arrJob: [
      { id: "SE", title: "Software Engineer", salary: "1000" },
      { id: "AI", title: "Artifact Intelligence", salary: "2000" },
      { id: "IA", title: "Information Assurance", salary: "1000" },
    ],
  };

  addNewJob = (job) => {
    this.setState({
      arrJob: [...this.state.arrJob, job],
    });
  };

  deleteJob = (job) => {
    let currentJobs = this.state.arrJob;
    currentJobs = currentJobs.filter((item) => item.id !== job.id);
    this.setState({
      arrJob: currentJobs,
    });
  };

  render() {
    return (
      <>
        <AddComponent addNewJob={this.addNewJob} />

        <ChildComponent arrJob={this.state.arrJob} deleteJob={this.deleteJob} />
      </>
    );
  }
}

export default MyComponent;
