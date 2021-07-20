import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types';

const Task = ({id, done, text, onChange, onDelete}) => {
  const listItemClasess = classNames('list-item', {'list-item_done': done});
  return (
    <li className={listItemClasess}>
      <input
        type="checkbox"
        className="list-item__ckeckbox"
        defaultChecked={done}
        onChange={() => onChange(id)}
      />
      <span className="list-item__text">{text}</span>
      <button className="list-item__delete-btn" onClick={() => onDelete(id)}></button>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task