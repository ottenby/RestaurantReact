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

  export interface IUpdateData {
    amountOfGuests: string;
    customerId: string;
    _id: string;
    time: string;
    date: string;
    bookingActive: boolean;
    bookingFinished: boolean;
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
    deleteBooking: (booking: IBooking[]) => void;
  }

export function AdminParent(props: IAdminParentProps) {

  const [dateFromAdmin, setDateFromAdmin] = useState("");
  const [getBookings, setGetBookings] = useState(false)
  const [updateBookings, setUpdateBookings] = useState<IUpdateData>({
    amountOfGuests: "",
    customerId: "",
    _id: "",
    time: "",
    date: "",
    bookingActive: true,
    bookingFinished: false,
    name: "",
    phone: "",
    email: "",
  })

  function updateBookingValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IUpdateData
  ) {
    setUpdateBookings({ ...updateBookings, [id]: e.target.value });
  }

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

    function updateOneBooking(book: IBooking, guest: IGuest) {
        console.log("tjena", book, guest)
    }

  function deleteBooking(id: string) {
    axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
        const deleteBooking = props.bookings.filter((b) => {
            if (b._id !== id) {
                return b;
            }
            return null;
        })
        console.log("den uppdaterade listan från parent ", deleteBooking)
        props.deleteBooking(deleteBooking)
        console.log("id från deleted booking", id)
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
          updateBookingValues={updateBookingValues}
          updateOneBooking={updateOneBooking}
        ></Tables>  
    </React.Fragment>
  );
}


