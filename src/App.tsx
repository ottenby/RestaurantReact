import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import { IBooking, GuestParent } from './components/guest/GuestParent';
import { AdminParent, IGuest } from './components/admin/AdminParent';

function App() {

    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [guests, setGuests] = useState<IGuest[]>([]);

    function addBooking(b: IBooking) {
        let postedBookings = bookings;
        postedBookings.push(b);
        setBookings(postedBookings)
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
        axios.get("http://localhost:8000/guests").then(response => {
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
    <Switch>
      <Route exact path="/admin">
        <AdminParent bookings={bookings} 
                    guests={guests} 
                    setBookings={setBookings}
                    />
      </Route>
      <Route path="/">
        <GuestParent bookings={bookings} 
                    setBookings={setBookings}
                    guests={guests}
                    setGuests={setGuests}
                    updateBookings={addBooking} />
      </Route>
    </Switch>
    </div>
</Router>
  );
}

export default App;
