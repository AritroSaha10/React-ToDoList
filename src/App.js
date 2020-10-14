import React, { Component } from "react";

// Pages
import Main from "./pages/main";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CSS Files
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    toDoItems: [
      {
        completed: false,
        description: "lol",
        dueDate: Date.now() + 6000000,
        id: 1,
      },
      {
        completed: false,
        description: "lol2",
        dueDate: 1602560000064,
        id: 2,
      },
    ],
  };

  handleCompletionChange = (e) => {
    let toDoItems = [...this.state.toDoItems];
    let i = toDoItems.findIndex(
      (item) => Number(item.id) === Number(e.target.id)
    );
    let changedItem = {
      ...toDoItems[i],
      completed: e.target.checked,
    };
    toDoItems[i] = changedItem;
    this.setState({ toDoItems });
  };

  addToDoItem = (item) => {
    this.setState({ toDoItems: [...this.state.toDoItems, item] });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Main
          toDoItems={this.state.toDoItems.sort((a, b) => {
            // Show item first if overdue
            if (a.dueDate < Date.now()) {
              return -1;
            } else if (b.dueDate < Date.now()) {
              return 1;
            }

            if (a.dueDate < b.dueDate) { 
              return 1;
            } else if (a.dueDate > b.dueDate) {
              return -1;
            } else {
              return 0;
            }
          })}
          onCompletionChange={this.handleCompletionChange}
          addToDoItem={this.addToDoItem}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
