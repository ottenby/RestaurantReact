import React, { useState, useEffect } from 'react';
import { Tables } from './tables/Tables';
import axios from 'axios';
export interface IFormData {
    date: string;
    numberOfGuests: string;
    phone?: string;
    email?: string;
  }
  
  export interface IBooking {
    amountOfGuests: string;
    customerId: string;
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

export function AdminParent() {


  //const [earlyBookings, setEarlyBookings] = useState<IBooking[]>();
 // const [lateBookings, setLateBookings] = useState<IBooking[]>();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [guests, setGuests] = useState<IGuest[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/").then(response => {
      let bookings: IBooking[] = response.data.map((b: IBooking) => {
        return {
        amountOfGuests: b.amountOfGuests,
          customerId: b.customerId,
          time: b.time,
          date: b.date,
          active: b.bookingActive,
          finished: b.bookingFinished
        };
      });
      setBookings(bookings);
      console.log(bookings)
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/guests").then(response => {
        // console.log(response.data)
        let guests: IGuest[] = response.data.map((g: IGuest) => {
            return {
                name: g.name,
               _id: g._id,
                phone: g.phone,
                email: g.email
            };
        });
        setGuests(guests);
        console.log(guests);
    })
  }, []);
  console.log(guests);


  /*function checkAvailability() {
    let listOfBookingsSameDay = bookings.filter(
      booking => booking.date;
    );

    let earlyBookingsData: IBooking[] = [];
    let lateBookingsData: IBooking[] = [];


    for (let i = 0; i < listOfBookingsSameDay.length; i++) {
      if (listOfBookingsSameDay[i].time === "18.00") {
        earlyBookingsData.push(listOfBookingsSameDay[i]);
      } else {
        lateBookingsData.push(listOfBookingsSameDay[i]);
      }
    }

    setEarlyBookings(earlyBookingsData);
    setLateBookings(lateBookingsData);

  }*/



  return (
    <React.Fragment>

      <Tables
          bookings={bookings}
          //checkAvailability={checkAvailability()}
         /*guestList={guests}
          earlyBookings={earlyBookings}
          lateBookings={lateBookings}*/
        ></Tables>  

    </React.Fragment>
  );
}


