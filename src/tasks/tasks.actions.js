import {fetchTasksList} from './tasksGateway'

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
    fetchTasksList().then((tasksList) => dispatch(tasksListRecieved(tasksList)))
  }

  return thunkAction;
}