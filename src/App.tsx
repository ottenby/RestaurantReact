import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { IBooking, GuestParent } from './components/guest/GuestParent';
import { AdminParent, IGuest } from './components/admin/AdminParent';
import { ModifyBooking } from './components/admin/modifyBooking/ModifyBooking';

function App() {

    //State-variabel där alla bokningar från databasen lagras
    const [bookings, setBookings] = useState<IBooking[]>([]);
    //State-variabel där alla gäster från databasen lagras
    const [guests, setGuests] = useState<IGuest[]>([]);

    //Lifting state up från child (guestparent) där vi får den postade bokningen från grandchild (createbooking)
    function addBooking(b: IBooking) {
        let postedBookings = bookings;
        postedBookings.push(b);
        //Pushar in den nya bokningen i dom existerade bokningarna som hämtats från databasen
        setBookings(postedBookings);
    };

    //Används vid delete. Lifting state up. Får id på den borttagna bokningen från child (adminparent) som i sin tur fått id från grandchild (tables)
    function getEditedArray(id: string) {
        //Här filtrerar vi ut id:t från bookings (bokningarna från databasen)
        const deleteBooking = bookings.filter((b) => {
            if (b._id !== id) {
                return b;
            }
            return null;
        });
        //Pushar in arrayen deleteBooking som filtrerat ut det borttagna id:t från databasen
        setBookings(deleteBooking);
    };

    //Hämtar alla bokningar från databasen. Det görs vid sidladdning och sparas i bookings-statet
    useEffect(() => {
        axios.get("http://localhost:8000/").then(response => {
          let bookings: IBooking[] = response.data.map((b: IBooking) => {
            return {
              amountOfGuests: b.amountOfGuests,
              customerId: b.customerId,
              _id: b._id,
              time: b.time,
              date: b.date
            };
          });
          setBookings(bookings);
        });
        
    }, []);

    //Hämtar alla gäster från databasen. Det görs vid sidladdning och sparas i guests-statet
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
            setGuests(guests);
        })
    }, []);

  return (
    <Router>
    <div className="main-wrapper">
    <Switch>
      <Route exact path="/admin">
        <AdminParent bookings={bookings} 
                    guests={guests} 
                    setBookings={setBookings}
                    newArrayWithDeletedBooking={getEditedArray}
                    />
      </Route>
      <Route exact path="/">
        <GuestParent bookings={bookings} 
                    setBookings={setBookings}
                    guests={guests}
                    setGuests={setGuests}
                    updateBookings={addBooking} />
      </Route>
      <Route exact path="/admin/update/:id">
          <ModifyBooking guests={guests}
          bookings={bookings}
          setBookings={setBookings}
          />
      </Route>
    </Switch>
    </div>
</Router>
  );
}

export default App;
