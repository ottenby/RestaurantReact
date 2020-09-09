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
  const [date, setDate] = useState("");

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value, date});
  };

  function updateDateFromChild(date: string) {
    setDate(date)
  };
  const [showMessage, setShowMessage] = useState(false);


  function message() {
    if(formData.date === '' && formData.numberOfGuests === '') {
      return(
        <div>Du måste fylla i datum och antal gäster</div>
      )
    }
    if(formData.date === '') {
      return (<div>Du måste välja ett datum</div>)
    }
    if(formData.numberOfGuests === '') {
      return (<div>Du måste ange antal gäster</div>)
    }
  };
  

  function sendDataToParent(b: IBooking) {
    props.updateBookings(b);
  };

  function checkValidation() {
    setShowMessage(true)
      if(formData.date !== '' && formData.numberOfGuests !== '') {
        checkAvailability()
      }
      return null
  };

  function checkAvailability() {
    console.log("formdata: ", formData)
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
    };

    setEarlyBookings(earlyBookingsData);
    setLateBookings(lateBookingsData);
  };

  return (
    <React.Fragment>
      <CheckIfTableAvailable
        formData={formData}
        checkAvailability={checkAvailability}
        updateFormValues={updateFormValues}
        earlyBookings={earlyBookings}
        lateBookings={lateBookings}
        checkValidation={checkValidation}
        validationMessage = {message}
        showMessage = {showMessage}
        updateDate={updateDateFromChild}
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
          updateBookings={sendDataToParent}
        />
      )}
    </React.Fragment>
  );
}
