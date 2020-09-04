import './Tables.css'
import React, { ChangeEvent } from 'react';
import { IBooking, IUpdateData } from '../AdminParent';
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
    updateBookingValues: (
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IUpdateData
      ) => void;
    updateOneBooking: (book: IBooking, guest: IGuest) => void;
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
                            <h3>Bokning</h3>
                            <input type="date" name="date" value={table.date} onChange={e => props.updateBookingValues(e, "date")}/>
                            <p>{table.time} </p>
                            <p>{table.amountOfGuests} </p>
                            <p>{table.customerId}</p>
                            <div><button onClick={() => props.deleteBooking(table._id)}>Ta bort bokning</button></div>
                            <input type="text" name="email" value={guest.email} onChange={e => props.updateBookingValues(e, "email")} />
                            <input type="text" name="name" onChange={e => props.updateBookingValues(e, "name")} />
                            <p>{guest.phone}</p>
                            <button onClick={() => props.updateOneBooking(table, guest)}>Uppdatera bokning</button>
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