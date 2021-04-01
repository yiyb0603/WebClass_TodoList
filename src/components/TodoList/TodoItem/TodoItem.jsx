import React, { useState, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { FaPen } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';
import style from './TodoItem.scss';
import { customTrim } from 'util/customTrim';

const cx = classNames.bind(style);

const TodoItem = ({ id, index, text, isCompleted, setTodos }) => {
  const modifyRef = useRef();
  const [modifyValue, setModifyValue] = useState('');
  const [isModify, setIsModify] = useState(false);

  const onChangeIsModify = useCallback(() => {
    if (!isModify) {
      setModifyValue(text);
    }

    setIsModify((prevModify) => !prevModify);
  }, [isModify, text]);

  const onModifyTodo = useCallback(() => {
    if (!customTrim(modifyValue)) {
      return;
    }

    setIsModify(false);
    setTodos((prevTodos) => (
      prevTodos.map((todo) => todo.id === id ? {...todo, text: modifyValue} : todo)
    ));
    
    setModifyValue('');
  }, [id, modifyValue, setTodos]);

  const onDeleteTodo = useCallback(() => {
    setTodos((prevTodos) => (
      prevTodos.filter((todo) => todo.id !== id)
    ));
  }, [id, setTodos]);

  const onChangeModifyValue = useCallback(({ target: { value } }) => {
    setModifyValue(value);
  }, []);

  const onKeydownModifyValue = useCallback(({ key }) => {
    if (key === 'Enter') {
      onModifyTodo();
    }
  }, [onModifyTodo]);

  const setCompleted = useCallback(() => {
    setTodos((prevTodos) => (
      prevTodos.map((todo) => todo.id === id ? {...todo, isCompleted: !isCompleted} : todo
    )));
  }, [id, isCompleted, setTodos]);

  const onOutSideClick = useCallback((e) => {
    if (modifyRef.current && !modifyRef.current.contains(e.target)) {
      setIsModify(false);
    }
  }, []);

  useEffect(() => {
    if (isModify) {
      document.addEventListener('click', onOutSideClick, true);

      return () => document.removeEventListener('click', onOutSideClick, true);
    }
  }, [isModify, onOutSideClick]);

  return (
    <div className={cx('TodoItem')}>
      <div className={cx('TodoItem-Contents')}>
        <div className={cx('TodoItem-Contents-Index')}>{index}. </div>
      {
        isModify ?
        <input
          type='text'
          className={cx('TodoItem-ModifyInput')}
          value={modifyValue}
          onChange={onChangeModifyValue}
          onKeyDown={onKeydownModifyValue}
          ref={modifyRef}
        />
        :
        <div className={cx('TodoItem-Text', {
          'TodoItem-Text-Completed': isCompleted,
        })} onClick={setCompleted}>{text}</div>
      }
      </div>
      
      {
        isModify ?
        <BsCheck
          className={cx('TodoItem-Check')}
          onClick={onModifyTodo}
        />
        :
        <div className={cx('TodoItem-Icons')}>
          <FaPen className={cx('TodoItem-Icons-Modify')} onClick={onChangeIsModify} />
          <IoMdClose className={cx('TodoItem-Icons-Delete')} onClick={onDeleteTodo} />
        </div>
      }
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoItem;
