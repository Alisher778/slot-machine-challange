import React from 'react';
import PropTypes from 'prop-types';
import { WheelItem } from '../styles';
import banana from '../assets/img/banana.png';
import monkey from '../assets/img/monkey.png';
import orange from '../assets/img/orange.png';
import strawberry from '../assets/img/strawberry.png';

const Spinner = ({ index = 0, stop = false }) => {
  const symbols = [
    { img: banana, value: 'banana' },
    { img: monkey, value: 'monkey' },
    { img: orange, value: 'orange' },
    { img: strawberry, value: 'strawberry' },
  ];

  const { img, value } = symbols[index];

  return (
    <WheelItem stop={stop} className="Spinner">
      <img src={img} alt={value} width={100} />
    </WheelItem>
  );
};

Spinner.propTypes = ({
  index: PropTypes.number,
  stop: PropTypes.bool,
});

export default Spinner;
