import React, { useState, useEffect } from "react";
import axios from 'axios';

export class Booking {
  _id: string = '';
  guestName: string = '';
  amountOfGuests: string = '';
  customerId: string = '';
  time: string = '';
  date: string = '';
  bookingActive: boolean = false;
  bookingFinished: boolean = false;
}
export interface IBooking {

  _id: string;
  guestName: string;
  amountOfGuests: string;
  customerId: string;
  time: String,
  date: String,
  bookingActive: boolean;
  bookingFinished: boolean;
}

export interface IFormData {
  name: string;
  date: string;
  numberOfGuests: string;
}

export function Form() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    date: "",
    numberOfGuests: "",
    phone:"" ,
    email:""

  });

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value});
  }

  console.log(formData);




  function checkIfTable() {
    let listOfBookingsSameDay = bookings.filter(booking => booking.date === formData.date);
    console.log(listOfBookingsSameDay);

    continueToCheck(listOfBookingsSameDay) 
  }

  let earlyBookings: IBooking[] = [];
  let lateBookings: IBooking[] = [];

  

  function continueToCheck(array: IBooking[]) {

    for (let i = 0; i < array.length; i++) {
      
      if(array[i].time === '18.00') {
        earlyBookings.push(array[i])
      } else {
        lateBookings.push(array[i])
      }
      
    }

    console.log(earlyBookings)
    console.log(lateBookings)
    if (earlyBookings.length < 14) {
      renderEarlyButton() 
    }

    if (lateBookings.length < 14) {
        renderLateButton() 
    }
  }

  function renderEarlyButton() {
    console.log('tidig')
    let variable = document.getElementById('second-form')
    console.log(variable);

  }
  function renderLateButton() {
    console.log('sen')
  }

  let aBooking = new Booking()
  function newBooking(text: string) {

    
    aBooking.time = text;
    aBooking.bookingFinished = false;
    aBooking.bookingActive = true;
    aBooking.amountOfGuests = formData.numberOfGuests;
    aBooking.date = formData.date;
    aBooking.guestName = formData.name;
    // aBooking.customerId =

    console.log(aBooking);
    
  }


  useEffect(()=> {
    axios.post('http://localhost:8000/', {
      name: "Lovis"
    })
    .then(function () {
      
    })
  }, [])
  
  let defaultValue: IBooking[] = [];
  const[bookings, setBookings] = useState(defaultValue);

  useEffect(() => {
    axios.get("http://localhost:8000/").then(
        response => {
          let bookings: IBooking[] = response.data.map( (b: IBooking) => {
            console.log(b)
            return {
              id: b._id, 
              numberOfGuests: b.amountOfGuests,
              guestId: b.customerId,
              sitting: b.time,
              date: b.date,
              active: b.bookingActive,
              finished: b.bookingFinished
            }
          }) 
          
          setBookings(bookings)
          
        })
  }, [])
  console.log(bookings);



  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={e => updateFormValues(e, "name")}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        onChange={e => updateFormValues(e, "date")}
      />
      <input
        type="number"
        max="6"
        name="number-of-guests"
        placeholder="Number of guests"
        className="num-of-guests"
        onChange={e => updateFormValues(e, "numberOfGuests")}
      />
      <button
        /*onClick={newQuery}*/>
        Check for available tables
      </button>

      <div className="second-form" id="second-form">
        <input
          type="text"
          name="mobile"
          placeholder="Phone Number"
          className="mobile"
          onChange={e => updateFormValues(e, "phone")}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="email"
          onChange={e => updateFormValues(e, "email")}
        />


          <button onClick={()=> {newBooking('18.00')}}>18.00</button>
          <button onClick={()=> {newBooking('20.30')}}>20.30</button>

      </div>
    </>
  );
}
