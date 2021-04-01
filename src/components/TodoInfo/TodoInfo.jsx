import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './TodoInfo.scss';

const cx = classNames.bind(style);

const TodoInfo = ({ todos }) => {
  const completedCount = useMemo(() => todos.filter((todo) => todo.isCompleted).length, [todos]);

  return (
    <div className={cx('TodoInfo')}>
      완료된 Todo: {completedCount} / {todos.length}
    </div>
  );
};

TodoInfo.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default memo(TodoInfo);
