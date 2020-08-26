import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IBooking } from '../createBooking.tsx/CreateBooking';

export interface IFormData {
    name: string;
    date: string;
    numberOfGuests: string;
   }

export interface ICheckIfTableAvailableProps {
    sendFormData(formObject: IFormData): void;
}

   //IPSUM

export default function CheckIfTableAvailable(props: ICheckIfTableAvailableProps) {

    const [formData, setFormData] = useState<IFormData>({
        name: "",
        date: "",
        numberOfGuests: "",
    });
        
    function updateFormValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IFormData
        ) {
        setFormData({ ...formData, [id]: e.target.value});
    }

    function checkIfTable() {
        props.sendFormData(formData);

        checkAvailability();
    }

    function checkAvailability() {
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
        
        console.log(earlyBookings);
        console.log(lateBookings);

        if (earlyBookings.length < 14) {
            console.log("Det går bra med tidig")
        }
        
        if (lateBookings.length < 14) {
            console.log("Det går bra med sen")
        }
    }

    let defaultValue: IBooking[] = [];
    const[bookings, setBookings] = useState(defaultValue);
    
    useEffect(() => {
        axios.get("http://localhost:8000/").then(
        response => {
        let bookings: IBooking[] = response.data.map( (b: IBooking) => {
            return {
                // id: b._id,
                numberOfGuests: b.amountOfGuests,
                // guestId: b.customerId,
                time: b.time,
                date: b.date,
                active: b.bookingActive,
                finished: b.bookingFinished
            }
        })
 
        setBookings(bookings)
    })
}, [])

console.log(bookings);

    return(
        <>
        <div id="booking-form">
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
            onClick={checkIfTable}>
            Check for available tables
            </button>
        </div>
    </>
    )
}