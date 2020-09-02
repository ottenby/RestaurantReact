import './Tables.css'
import React, { ChangeEvent } from 'react';
import { IBooking } from '../AdminParent';
import { IGuest } from '../../guest/GuestParent';

interface IpropsTable{
    bookings:IBooking[]
    guests:IGuest[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    dateFromAdmin: string
    getBookings: boolean
    getBookingsByDate: IBooking[]
    setDateFromAdmin: (e: string) => void;
    deleteBooking: (id: string) => void;
    showBookingsByDate: () => void;
    setGetBookings: (e: boolean) => void;
}

export function Tables(props:IpropsTable) {

    function updateDateValue(e: ChangeEvent<HTMLInputElement>) {
        props.setDateFromAdmin(e.target.value)
        // props.setGetBookings(false)
    }
    
    let allBookings = props.getBookingsByDate.map((table, i=parseInt(table.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {

            if(table.customerId === guest._id) {
                return(
                    <div className="table" key={i}>
                        <div className="first-sitting sitting table-active">
                            <h3>Tidig sittning</h3>
                            <p>{table.date}</p>
                            <p>{table.time} </p>
                            <p>{table.amountOfGuests} </p>
                            <p>{table.customerId}</p>
                            <div><button onClick={() => props.deleteBooking(table._id)}>Ta bort bokning</button></div>
                            <p>{guest.email}</p>
                            <p>{guest.name}</p>
                            <p>{guest.phone}</p>
                        </div>
                    </div>
                )
            }
            return null
        })
    }) 

    return(
        <>
            <input type="date" value={props.dateFromAdmin} onChange={updateDateValue}></input>
            <button onClick={props.showBookingsByDate}>Visa bokningar</button>
            {props.getBookings ?
            <div className="all-bookings"> {allBookings} </div> 
            : null}  
        </>
    )
}