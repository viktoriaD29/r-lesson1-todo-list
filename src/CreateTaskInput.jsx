import React, { Component } from 'react';

class CreateTaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handelChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handelTaskCreate = () => {
    this.props.onCreate(this.state.value)
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div className="create-task">
        <input
          type="text"
          className="create-task__input"
          value={this.state.value}
          onChange={this.handelChange}
        />
        <button
          className="btn create-task__btn"
          onClick={this.handelTaskCreate}
        >
          Create
        </button>
      </div>
    );
  }
}

export default CreateTaskInput;

// 1.take text from input
// 2.create task with this text
// 3.add created task in the list
