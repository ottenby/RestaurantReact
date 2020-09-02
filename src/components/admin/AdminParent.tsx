import React, { useState } from 'react';
import { Tables } from './tables/Tables';
import axios from 'axios';

export interface IBooking {
    amountOfGuests: string;
    customerId: string;
    _id: string;
    time: string;
    date: string;
    bookingActive: boolean;
    bookingFinished: boolean;
  }
  
  export interface IGuest {
      _id: string;
      name: string;
      phone: string;
      email: string;
  }

  interface IAdminParentProps {
    bookings: IBooking[];
    setBookings: (booking: IBooking[]) => void;
    guests: IGuest[];
    getBookingsByDate: IBooking[]
    setGetBookingsByDate: (b: IBooking[]) => void;
  }

export function AdminParent(props: IAdminParentProps) {

  const [dateFromAdmin, setDateFromAdmin] = useState("");
  const [getBookings, setGetBookings] = useState(false)


    function showBookingsByDate() {
        let filterBookingsByDate = props.bookings.filter((booking) => { 
                console.log(booking)
                if(booking.date === dateFromAdmin) {
                    return booking
                }
                return null
            })
        props.setGetBookingsByDate(filterBookingsByDate)
        setGetBookings(true)
        console.log(props.getBookingsByDate)
        console.log(dateFromAdmin)
    }

  function deleteBooking(id: string) {
    axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
        const deleteBooking = props.bookings.filter((b) => {
            if (b._id !== id) {
                return b;
            }
            return null;
        })
        console.log(deleteBooking)
        props.setBookings(deleteBooking);
    })
}

  return (
    <React.Fragment>
      <Tables
          bookings={props.bookings}
          getBookingsByDate={props.getBookingsByDate}
          guests={props.guests}
          deleteBooking={deleteBooking}
          showBookingsByDate={showBookingsByDate}
          dateFromAdmin={dateFromAdmin}
          setDateFromAdmin={setDateFromAdmin}
          getBookings={getBookings}
          setGetBookings={setGetBookings}
        ></Tables>  
    </React.Fragment>
  );
}


