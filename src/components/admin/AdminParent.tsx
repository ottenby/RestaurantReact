import React, { useState } from 'react';
import { Tables } from './tables/Tables';

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
  }

export function AdminParent(props: IAdminParentProps) {

    const [updateBookings, setUpdateBookings] = useState<IBooking>({
        amountOfGuests: "",
        customerId: "",
        _id: "",
        time: "",
        date: "",
        bookingActive: true,
        bookingFinished: false,
    })

    function updateBookingValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IBooking
        ) {
        setUpdateBookings({ ...updateBookings, [id]: e.target.value });
        console.log("den uppdaterade bokningen", updateBookings)
    }

    function updateOneBooking(book: IBooking, guest: IGuest) {
        console.log("tjena", book, guest)
    }

    return (
        <React.Fragment>
        <Tables
            bookings={props.bookings}
            guests={props.guests}
            updateBookingValues={updateBookingValues}
            updateOneBooking={updateOneBooking}
            ></Tables>  
        </React.Fragment>
    );
}


