import React from 'react';
import { connect } from 'react-redux';

const PopUp = props => {
  const { error, show, msg } = props;
  let type = error ? 'error' : 'success';
  let display = show ? ' show' : ' hide';
  type = type.concat(display);
  return (
    <div className={`popup ${type}`}>
      <div className='popup-content'>{msg}</div>
    </div>
  );
};

const mapStateToProps = ({ popUp }) => {
  return { ...popUp };
};

export default connect(mapStateToProps)(PopUp);
