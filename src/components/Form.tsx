import React, { useState, useEffect } from "react";
import { Query } from "../models/Query";
import axios from 'axios';


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
    numberOfGuests: ""
  });

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value});
  }

  console.log(formData);

  function newQuery() {
    let query = new Query();
    query.date = formData.date;
    query.numOfPeople = formData.numberOfGuests;
    console.log(query);
  }

 

  useEffect(()=> {
    axios.post('http://localhost:8000/', {
      name: "Lovis"
    })
    .then(function (response) {
      
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
        onClick={newQuery}>
        Check for available tables
      </button>
    </>
  );
}
