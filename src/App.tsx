import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Todo } from './types/Todo';
import TodoList from './components/Todo/TodoList';
import { Error } from './types/Error';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { Filter } from './types/Filter';
import { getFiltredTodoList } from './services/filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('FilterLinkAll');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>(
    getFiltredTodoList(filter, todos),
  );

  const [error, setError] = useState<Error>({
    isVisible: false,
    type: '',
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError({
          isVisible: true,
          type: 'load',
        });

        setTimeout(() => {
          setError({
            isVisible: false,
            type: '',
          });
        }, 3000);
      });
  }, []);

  useEffect(() => {
    setFiltredTodos(getFiltredTodoList(filter, todos));
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* this button should have `active` class only if all todos are completed */}
        <Header />

        <TodoList todos={filtredTodos} />

        {!!todos.length && (
          <Footer todos={todos} filter={filter} updateFilter={setFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
};
