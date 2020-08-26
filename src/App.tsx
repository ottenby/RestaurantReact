import React from 'react';

import './App.css';
import { AdminView } from './views/AdminView';
import { GuestView } from './views/ GuestView';

function App() {
  return (
    <React.Fragment>
      <AdminView></AdminView> 
      <GuestView></GuestView>
    </React.Fragment>
  );
}

export default App;
