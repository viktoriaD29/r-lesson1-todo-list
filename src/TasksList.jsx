import React, { Component } from 'react';
import Task from './Task';
import CreateTaskInput from './CreateTaskInput';
import {
  createTask,
  fetchTasksList,
  updataTask,
  deleteTask,
} from './tasksGateway';

class TasksList extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    fetchTasksList().then((taskList) => {
      this.setState({
        tasks: taskList,
      });
    });
  };

  onCreate = (text) => {
    //1.create task object
    //2.post object to server
    //3.fetch list from server

    const newTask = {
      id: Math.random,
      text,
      done: false,
    };

    createTask(newTask).then(() => this.fetchTasks());
  };

  handelTaskStatusChange = (id) => {
    //1.find task in state by id
    //2.create updated task
    //3.update task on server
    //4.fetch updated task list

    const { text, done } = this.state.tasks.find((task) => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };

    updataTask(id, updatedTask).then(() => this.fetchTasks());
  };

  handelTaskDelete = (id) => {
    //1.filter tasks
    //2.update state

    // const updatedTask = this.state.tasks.filter((task) => task.id !== id);

    // this.setState({
    //   tasks: updatedTask,
    // });

    deleteTask(id).then(() => this.fetchTasks());
  };

  render() {
    const sortedList = this.state.tasks.slice().sort((a, b) => a.done - b.done);
    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map((task) => (
            <Task
              key={task.id}
              {...task}
              onChange={this.handelTaskStatusChange}
              onDelete={this.handelTaskDelete}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TasksList;
