import React from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch'),
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];
      return {
        todoData: newArray
      };
     
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };

    });
  };

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];

      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };


  // searchLabel = (text, arr) => {
    
  // }



  onSearch = (searchText) => {
     this.setState(({todoData}) => {
       const newArray = todoData.filter((item) => item.label.includes(searchText));
       console.log(newArray);

       return {
         todoData: newArray
       };
     });
  }

  render() {
    const { todoData } = this.state
    const doneCount = todoData.filter((el) => el.done).length;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoData.length - doneCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch}/>
          <ItemStatusFilter/>
        </div>
  
        <TodoList todos={ todoData }
        onDeleted={ this.deleteItem }
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};