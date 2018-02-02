import React from 'react';
import { CoachMark } from '../index';

class CoachMarkContainer extends React.Component {
  constructor(props) {
    super();
    this.state = { show: true };
  }
  
  componentWillReceiveProps() {
    this.setState({ show: true });
  }
  
  onClose = () => {
    this.setState({ show: false });
  };
  
  render() {
    return (
      this.state.show &&
        <CoachMark {...this.props} onClose={this.onClose} />
    );
  }
}

export default CoachMarkContainer;