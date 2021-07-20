import React from 'react'

const CreateTaskInput = () => {
  return (
    <div className="create-task">
      <input type="text" className="create-task__input"/>
      <button className="btn create-task__btn">Create</button>
    </div>
  )
}

export default CreateTaskInput;