import React, { useState, useEffect } from "react";
import CheckIfTableAvailable from "./checkIfTableAvailable/CheckIfTableAvailable";
import CreateBooking from "./createBooking.tsx/CreateBooking";
import axios from "axios";

export interface IFormData {
  name: string;
  date: string;
  numberOfGuests: string;
  phone?: string;
  email?: string;
}

export interface IBooking {
  _id: string;
  guestName: string;
  amountOfGuests: string;
  customerId: string;
  time: string;
  date: string;
  bookingActive: boolean;
  bookingFinished: boolean;
}

export function GuestParent() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    date: "",
    numberOfGuests: ""
  });

  const [earlyBookings, setEarlyBookings] = useState<IBooking[]>();
  const [lateBookings, setLateBookings] = useState<IBooking[]>();
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/").then(response => {
      let bookings: IBooking[] = response.data.map((b: IBooking) => {
        return {
          // id: b._id,
          numberOfGuests: b.amountOfGuests,
          // guestId: b.customerId,
          time: b.time,
          date: b.date,
          active: b.bookingActive,
          finished: b.bookingFinished
        };
      });

      setBookings(bookings);
    });
  }, []);

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value });
  }

  function checkAvailability() {
    let listOfBookingsSameDay = bookings.filter(
      booking => booking.date === formData.date
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

  }



  return (
    <React.Fragment>
      <CheckIfTableAvailable
        formData={formData}
        checkAvailability={checkAvailability}
        updateFormValues={updateFormValues}
      ></CheckIfTableAvailable>

      {((earlyBookings && earlyBookings.length < 14) ||
        (lateBookings && lateBookings.length < 14)) && (
        <CreateBooking
          formData={formData}
          earlyBookings={earlyBookings}
          lateBookings={lateBookings}
        />
      )}
    </React.Fragment>
  );
}
