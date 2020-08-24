import React from 'react';

import './App.css';
import { FormView } from './views/FormView';
import { Tables } from './components/tables/Tables';

function App() {
  return (
    <React.Fragment>

      <FormView></FormView>
      <Tables></Tables>
 
    </React.Fragment>
  );
}

export default App;
