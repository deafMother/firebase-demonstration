import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class NoteSummary extends React.Component {
  render() {
    const { note, id } = this.props;
    //console.log(id);
    return (
      <Link to={`/noteDetail/${id}`}>
        <div className='single-note'>
          <h4>{note.title}</h4>
          <p>{note.description}</p>
          <p className='text-grey'>
            {moment(note.createdAt.toDate()).calendar()}
          </p>
        </div>
      </Link>
    );
  }
}

export default connect()(NoteSummary);
