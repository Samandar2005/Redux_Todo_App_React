import React from 'react';
import styled from 'styled-components';

const ListStyle = styled.li`
  padding: 5px;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  list-style: none;

  text-decoration: ${props => (props.applied ? 'line-through' : 'none')};
`;

const NameStyle = styled.span`
  margin-left: 20px;
`;

const XStyle = styled.div`
  float: right;
  :hover {
    color: red;
    cursor: pointer;
  }
`;

// ToDo is a stateless functional component and is therefore pure
const ToDo = props => (
  <ListStyle applied={props.applied}>
    <input
      type="checkbox"
      value={props.name}
      checked={props.applied}
      onChange={props.toggleTodo}
    />
    <NameStyle> {props.name} </NameStyle>
    <XStyle onClick={props.removeTodo}>✘</XStyle>
  </ListStyle>
);

export default ToDo;
