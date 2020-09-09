import React from 'react';
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
    newArrayWithDeletedBooking: (id: string) => void;
  }

export function AdminParent(props: IAdminParentProps) {

    function sendUpdatedArrayToParent(id: string) {
        props.newArrayWithDeletedBooking(id)
    }
    return (
        <React.Fragment>
        <Tables
            bookings={props.bookings}
            guests={props.guests}
            newArrayWithDeletedBooking={sendUpdatedArrayToParent}
            ></Tables>  
        </React.Fragment>
    );
}


