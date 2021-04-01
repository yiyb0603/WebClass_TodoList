import React from 'react';
import { Switch, Route } from 'react-router';
import TodoTemplate from 'components/TodoTemplate';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={TodoTemplate} />
    </Switch>
  );
};

export default App;