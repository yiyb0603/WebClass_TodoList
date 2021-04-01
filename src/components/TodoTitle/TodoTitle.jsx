import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './TodoTitle.scss';

const cx = classNames.bind(style);

const TodoTitle = ({ title }) => {
  return (
    <div className={cx('TodoTitle')}>{title}</div>
  );
};

TodoTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TodoTitle;