import React, { memo } from 'react';
import classNames from 'classnames';
import style from './NoTodos.scss';

const cx = classNames.bind(style);

const NoTodos = () => {
  return (
    <div className={cx('NoTodos')}>
      <div>Todo가 없습니다. 자유롭게 추가해보세요!</div>
    </div>
  );
};

export default memo(NoTodos);
