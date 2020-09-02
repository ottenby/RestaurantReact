import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import { IBooking, GuestParent } from './components/guest/GuestParent';
import { AdminParent, IGuest } from './components/admin/AdminParent';
// import { ModifyBooking } from './components/admin/modifyBooking/ModifyBooking';

function App() {

    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [guests, setGuests] = useState<IGuest[]>([]);
    const [getBookingsByDate, setGetBookingsByDate] = useState<IBooking[]>([])

    function updateBookings(b: IBooking) {
        setBookings([...bookings, b])
    }

    useEffect(() => {
        axios.get("http://localhost:8000/").then(response => {
          let bookings: IBooking[] = response.data.map((b: IBooking) => {
            return {
              amountOfGuests: b.amountOfGuests,
              customerId: b.customerId,
              _id: b._id,
              time: b.time,
              date: b.date,
              active: b.bookingActive,
              finished: b.bookingFinished
            };
          });
          setBookings(bookings);
        });
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8000/api/v1/guests").then(response => {
            let guests: IGuest[] = response.data.map((g: IGuest) => {
                return {
                    name: g.name,
                   _id: g._id,
                    phone: g.phone,
                    email: g.email
                };
            });
            setGuests(guests)
        })
      }, []);

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
        <AdminParent bookings={bookings} 
                    setBookings={setBookings}
                    guests={guests} 
                    getBookingsByDate={getBookingsByDate}
                    setGetBookingsByDate={setGetBookingsByDate}/>
      </Route>
      <Route path="/booking">
        <GuestParent bookings={bookings} 
                    setBookings={setBookings}
                    guests={guests}
                    setGuests={setGuests}
                    updateBookings={updateBookings} />
      </Route>
    </Switch>
    </div>
</Router>
  );
}

export default App;
