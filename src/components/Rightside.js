import React from 'react';
import {ListGroup} from 'react-bootstrap'
import moment from 'moment';

const Rightside = (props) => {
  return (
    <div className="rightside">
        <h1>User Data</h1>
        <ListGroup>
            <ListGroup.Item>{moment(props.creationTime).fromNow()}</ListGroup.Item>
            
        </ListGroup>
    </div>
  );
};

export default Rightside;
