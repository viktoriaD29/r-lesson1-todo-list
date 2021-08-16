import {TASKS__LIST_RECIEVED} from './tasks.actions'

const initialState = {
  tasksList: [],
}

const tasksReducer = (state = initialState, action) => {
  switch(action.type) {
    case TASKS__LIST_RECIEVED: 
      return {
        ...state,
        tasksList: action.payload.tasksList,
      };
    default:
      return state
  }
}

export default tasksReducer;