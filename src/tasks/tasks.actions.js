import * as tasksGateway from './tasksGateway'
import {tasksListSelector} from './tasks.selectors'

export const TASKS__LIST_RECIEVED = 'TASKS_RECIEVED'

export const tasksListRecieved = (tasksList) => {
  const action = {
    type: TASKS__LIST_RECIEVED,
    payload: {
      tasksList,
    },
  };

  return action
}

export const getTaskList = () => {
  const thunkAction = function(dispatch) {
    tasksGateway.fetchTasksList().then((tasksList) =>
      dispatch(tasksListRecieved(tasksList))
    );
  }

  return thunkAction;
}

export const updateTasks = (taskId) => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state)
    const task = tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};

export const deleteTasks = (taskId) => {
  const thunkAction = function (dispatch) {
    tasksGateway
      .deleteTask(taskId)
      .then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};

export const createTasks = (text) => {
  const thunkAction = function (dispatch) {
    const newTask = {
      text,
      done: false,
    };

    tasksGateway.createTask(newTask).then(() => dispatch(getTaskList()));
  };

  return thunkAction;
};