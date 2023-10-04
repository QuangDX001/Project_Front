import React from "react";

class ChildComponent extends React.Component {
  state = {
    showJobs: false,
  };

  handleShowHideInformation = () => {
    this.setState({
      showJobs: !this.state.showJobs,
    });
  };

  handleDeleteJob = (job) => {
    console.log(">>> handleOnclickDelete: ", job);
    this.props.deleteJob(job);
  };

  render() {
    let { arrJob } = this.props;
    let { showJobs } = this.state;

    return (
      <>
        {showJobs === false ? (
          <div>
            <button onClick={this.handleShowHideInformation}>Show</button>
          </div>
        ) : (
          <>
            <div className="job-list">
              {arrJob.map((job, index) => {
                return (
                  <div key={job.id}>
                    {job.title} - ${job.salary}
                    <> </>
                    <button onClick={() => this.handleDeleteJob(job)}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button onClick={this.handleShowHideInformation}>Hide</button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default ChildComponent;
