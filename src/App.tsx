import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import { AdminView } from './views/AdminView';
import { GuestView } from './views/ GuestView';
// import { ModifyBooking } from './components/admin/modifyBooking/ModifyBooking';

function App() {
  return (
    <Router>
    <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
      </ul>
    </nav>


    <Switch>
      <Route exact path="/admin">
        <AdminView />
      </Route>
      <Route path="/booking">
        <GuestView />
      </Route>
      {/* <Route path="/admin/:id">
          <ModifyBooking />
        </Route> */}
    </Switch>
    </div>
</Router>
  );
}

export default App;
