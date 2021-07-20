import React from 'react'
import classNames from 'classnames'

const Task = ({done, text}) => {
  const listItemClasess = classNames('list-item', {'list-item_done': done});
  return (
    <li className={listItemClasess}>
      <input
        type="checkbox"
        className="list-item__ckeckbox"
        defaultChecked={done}
      />
      <span className="list-item__text">{text}</span>
      <button className="list-item__delete-btn"></button>
    </li>
  );
}

export default Task