import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message = {} }) => {
  const colors = {
    super: '#4CAF50', ok: '#2196f3', bad: '#ee5c8d', good: '#cddc39',
  };
  return (
    <div className="Message">
      <h2 style={{ color: colors[message.type] }}>{message.content}</h2>
    </div>
  );
};

Message.propTypes = ({
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  })
});

export default Message;
