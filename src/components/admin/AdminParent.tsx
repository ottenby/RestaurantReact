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

    export interface IUpdateBooking {
        date: string;
        time: string;
        amountOfGuests: string;
        _id: string;
        customerId: string;
    }

    export class UpdateBooking {
        date: string = "";
        time: string = "";
        amountOfGuests: string = "";
        _id: string = "";
        customerId: string = "";
    }

  interface IAdminParentProps {
    bookings: IBooking[];
    setBookings: (booking: IBooking[]) => void;
    guests: IGuest[];
  }

export function AdminParent(props: IAdminParentProps) {

    const [updateBookings, setUpdateBookings] = useState<IUpdateBooking>({
        amountOfGuests: "",
        time: "",
        date: "",
        _id: "",
        customerId: "",
    })

    function updateBookingValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IUpdateBooking
        ) {
        setUpdateBookings({ ...updateBookings, [id]: e.target.value });
        console.log("den uppdaterade bokningen", updateBookings)
    }

    let updateABooking = new UpdateBooking();

    function changeBooking(text: string, customerId: string) {
        updateABooking._id = updateBookings._id;
        updateABooking.amountOfGuests = updateBookings.amountOfGuests;
        updateABooking.date = updateBookings.date;
        updateABooking.time = text;
        updateABooking.customerId = customerId;
        console.log("book ", updateBookings, text, customerId)
    }

    function updateOneBooking(id: string) {
        axios.put("http://localhost:8000/admin/update/" + id, updateABooking).then(response => {
            setUpdateBookings(updateABooking)
            console.log("book ", updateBookings)
        })
    }

    return (
        <React.Fragment>
        <Tables
            bookings={props.bookings}
            guests={props.guests}
            updateBookingValues={updateBookingValues}
            updateOneBooking={updateOneBooking}
            changeBooking={changeBooking}
            ></Tables>  
        </React.Fragment>
    );
}


