import React, { useState } from "react";
import CheckIfTableAvailable from "./checkIfTableAvailable/CheckIfTableAvailable";
import { CreateBooking } from "./createBooking/CreateBooking";

export interface IFormData {
  date: string;
  numberOfGuests: string;
  phone?: string;
  email?: string;
}

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

interface IGuestParentProps {
    bookings: IBooking[];
    setBookings: (booking: IBooking[]) => void;
    guests: IGuest[];
    setGuests: (guest: IGuest[]) => void;
    updateBookings: (b: IBooking) => void;
}

export function GuestParent(props: IGuestParentProps) {

  const [formData, setFormData] = useState<IFormData>({
    date: "",
    numberOfGuests: ""
  });

  const [earlyBookings, setEarlyBookings] = useState<IBooking[]>();
  const [lateBookings, setLateBookings] = useState<IBooking[]>();

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value });
  }

  function checkAvailability() {
    let listOfBookingsSameDay = props.bookings.filter(
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
    console.log(earlyBookingsData)
    console.log(lateBookingsData)
  }

  return (
    <React.Fragment>
      <CheckIfTableAvailable
        formData={formData}
        checkAvailability={checkAvailability}
        updateFormValues={updateFormValues}
        earlyBookings={earlyBookings}
        lateBookings={lateBookings}
      ></CheckIfTableAvailable>

      {((earlyBookings && earlyBookings.length < 14) ||
        (lateBookings && lateBookings.length < 14)) && (
        <CreateBooking
            bookings={props.bookings}
            setBookings={props.setBookings}
          guestList={props.guests}
          formData={formData}
          earlyBookings={earlyBookings}
          lateBookings={lateBookings}
          updateBookings={props.updateBookings}
        />
      )}
    </React.Fragment>
  );
}
