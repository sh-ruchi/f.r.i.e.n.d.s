import React from 'react';
import Container from '../Container';
import List from '../general/List';
class TodoListManagement extends React.Component {


  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container selectedTab={this.props.selectedTab} title={this.props.title}>
        <List type='ROOMS'></List>
      </Container>
    );
  }
}
export default TodoListManagement;
