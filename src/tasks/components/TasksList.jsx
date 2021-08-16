import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Task from '../../Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import * as tasksAction from '../tasks.actions';
import { sortedTasksListSelector } from '../tasks.selectors';

class TasksList extends Component {
  componentDidMount() {
    this.props.getTaskList();
  }

  render() {
    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.props.createTasks} />
        <ul className="list">
          {this.props.tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              onChange={this.props.updateTasks}
              onDelete={this.props.deleteTasks}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TasksList.propTypes = {
  getTaskList: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  deleteTasks: PropTypes.func.isRequired,
  createTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};

const mapState = (state) => {
  return {
    tasks: sortedTasksListSelector(state),
  };
};

const mapDispatch = {
  getTaskList: tasksAction.getTaskList,
  updateTasks: tasksAction.updateTasks,
  deleteTasks: tasksAction.deleteTasks,
  createTasks: tasksAction.createTasks
};

export default connect(mapState, mapDispatch)(TasksList);
