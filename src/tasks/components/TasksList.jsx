import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Task from '../../Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import {
  createTask,
  //fetchTasksList,
  updateTask,
  deleteTask,
} from '../tasksGateway';
import * as tasksAction from '../tasks.actions';
import { tasksListSelector } from '../tasks.selectors';

class TasksList extends Component {
  // state = {
  //   tasks: [],
  // };

  componentDidMount() {
    this.props.getTaskList();
    //this.fetchTasks();
  }

  // fetchTasks = () => {
  //   fetchTasksList().then((tasksList) =>
  //     this.setState({
  //       tasks: tasksList,
  //     })
  //   );
  // };

  onCreate = (text) => {
    //1. create task object
    //2. post object on server
    //3. fetch list from server
    const newTask = {
      text,
      done: false,
    };

    createTask(newTask).then(() => this.fetchTasks());
  };

  handleTaskStatusChange = (id) => {
    // 1. find task in state by id
    // 2. ctreate updated task
    // 3. update task on server
    // 4. fetch updated task list
    const { done, text } = this.state.tasks.find((task) => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };

    updateTask(id, updatedTask).then(() => this.fetchTasks());
  };

  handleTaskDelete = (id) => {
    deleteTask(id).then(() => this.fetchTasks());
  };

  render() {
    //const sortedList = this.state.tasks.slice().sort((a, b) => a.done - b.done);
    const sortedList = this.props.tasks.slice().sort((a, b) => a.done - b.done);

    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map((task) => (
            <Task
              key={task.id}
              {...task}
              onChange={this.handleTaskStatusChange}
              onDelete={this.handleTaskDelete}
            />
          ))}

          {/* <Task
            tasks={this.props.tasks}
            onChange={this.handleTaskStatusChange}
            onDelete={this.handleTaskDelete}
          /> */}
        </ul>
      </div>
    );
  }
}

TasksList.propTypes = {
  getTaskList: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};

const mapState = (state) => {
  return {
    tasks: tasksListSelector(state),
  };
};

const mapDispatch = {
  getTaskList: tasksAction.getTaskList,
};

export default connect(mapState, mapDispatch)(TasksList);
