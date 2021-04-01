import React, { memo } from 'react';
import classNames from 'classnames';
import style from './TodoTemplate.scss';
import TodoList from 'components/TodoList';

const cx = classNames.bind(style);

const TodoTemplate = () => {
  return (
    <div className={cx('TodoTemplate')}>
      <TodoList />
    </div>
  );
};

export default memo(TodoTemplate);