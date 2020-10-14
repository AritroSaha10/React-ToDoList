import React, { Component } from "react";
import moment from "moment";

class ToDoItem extends Component {
  state = {};
  render() {
    console.log(this.props.data);
    return (
      <div>
        <div className="form-check">
          <input
            id={this.props.data.id}
            type="checkbox"
            className="form-check-input"
            onClick={this.props.onCompletionChange}
            defaultChecked={this.props.data.completed}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            {this.props.data.description} &nbsp;
            <this.renderBadges />
          </label>
        </div>
      </div>
    );
  }

  renderBadges = () => {
    let badges = [];

    const futureText = this.props.data.dueDate > Date.now() ? "in" : "";
    const pastText = this.props.data.dueDate < Date.now() ? "ago" : "";

    console.log(this.props.data.dueDate);

    // Show due date and add overdue tag if task is not complete
    if (this.props.data.completed === false) {
      if (
        (Number(this.props.data.dueDate) !== 0) &
        !isNaN(this.props.data.dueDate)
      ) {
        if (pastText === "ago") {
          badges.push(
            <React.Fragment>
              <span
                key={this.props.data.id * 53}
                className="badge badge-danger inline"
              >
                Overdue
              </span>
              {"\u00A0"}
            </React.Fragment>
          );
        }

        badges.push(
          <React.Fragment>
            <span
              key={this.props.data.id * 57}
              className="badge badge-primary inline"
            >
              Due {futureText} {moment(this.props.data.dueDate).fromNow(true)}{" "}
              {pastText}{" "}
            </span>
            {"\u00A0"}
          </React.Fragment>
        );
      }
    }

    return badges.map((badge) => badge);
  };
}

export default ToDoItem;
