import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

const renderWithRouter = component => {
  const history = createMemoryHistory();
  return {
    history,
    ...render(<Router history={history}>{component}</Router>),
  };
};

export default renderWithRouter;
