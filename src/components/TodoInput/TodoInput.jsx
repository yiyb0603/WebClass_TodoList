import React, { useCallback, useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AiOutlineSend } from 'react-icons/ai';
import { customTrim } from 'util/customTrim';
import style from './TodoInput.scss';

const cx = classNames.bind(style);

const TodoInput = ({ todos, setTodos }) => {
  const nextId = useRef(todos.length <= 0 ? 1 : todos[todos.length - 1].id + 1);
  const [input, setInput] = useState('');

  const onChangeInput = useCallback(({ target: { value } }) => {
    setInput(value);
  }, []);

  const onAddTodo = useCallback(() => {
    if (!customTrim(input)) {
      return;
    }

    setTodos((prevTodos) => (
      [
        ...prevTodos,
        {
          id: nextId.current++,
          text: input,
          isCompleted: false,
        },
      ]
    ));

    setInput('');
  }, [input, setTodos]);

  const onKeyDownInput = useCallback(({ key }) => {
    if (key === 'Enter') {
      onAddTodo();
    }
  }, [onAddTodo]);

  return (
    <div className={cx('TodoInput')}>
      <input
        type='text'
        value={input}
        className={cx('TodoInput-Input')}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
        placeholder='할 일을 입력하세요.'
      />

      <AiOutlineSend
        className={cx('TodoInput-Send')}
        onClick={onAddTodo}
      />
    </div>
  );
};

TodoInput.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default memo(TodoInput);
