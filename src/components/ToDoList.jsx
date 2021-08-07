import React, { Component } from 'react';
import styled from 'styled-components';
import AddToDo from './AddToDo';
import ToDo from './ToDo';
import { fetchTodos } from '../services/api';
import uuidv4 from 'uuid/v4';

// styled components declarations
const ContainerStyle = styled.div`
  width: 400px;
  margin: auto;
  text-align: left;
  border-top: 1px solid #e4e4e4;
`;

const HeaderStyle = styled.h2`
  text-align: center;
`;

const LoadingStyle = styled.h4`
  text-align: center;
`;

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
      newTodo: ''
    };
    // these functions are bound so that they update state of the parent
    //  when passed down as props to child ToDo components
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const todos = await fetchTodos();
    this.setState({
      todos,
      loading: false
    });
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodo.trim()) {
      return;
    }
    const addedTodo = {
      id: uuidv4(),
      name: this.state.newTodo,
      applied: false
    };
    this.setState({
      todos: [...this.state.todos, addedTodo],
      newTodo: ''
    });
  }

  toggleTodo(id) {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.applied = !todo.applied;
      }
      return todo;
    });

    this.setState({ todos });
  }

  removeTodo(id) {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({
      todos
    });
  }

  render() {
    const companies = (
      <ContainerStyle>
        {this.state.todos.map(todo => (
          <ToDo
            // these functions are bound here to lock the ID param to the method
            toggleTodo={this.toggleTodo.bind(this, todo.id)}
            removeTodo={this.removeTodo.bind(this, todo.id)}
            key={todo.id}
            {...todo}
          />
        ))}
        <AddToDo
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.newTodo}
        />
      </ContainerStyle>
    );
    return (
      <div>
        <HeaderStyle> Companies to Apply @ </HeaderStyle>
        {this.state.loading ? (
          <LoadingStyle> loading... </LoadingStyle>
        ) : (
          companies
        )}
      </div>
    );
  }
}

export default ToDoList;
