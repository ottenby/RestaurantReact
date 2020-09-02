import './Tables.css'
import React, { useState, ChangeEvent } from 'react';
import { IBooking } from '../AdminParent';
import axios from 'axios';
import { IGuest } from '../../guest/GuestParent';

interface IpropsTable{
    bookings:IBooking[]
    guests:IGuest[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
}

export function Tables(props:IpropsTable) {

    const [dateFromAdmin, setDateFromAdmin] = useState("");
    const [allBookingsFromDate, setAllBookingsFromDate] = useState<IBooking[]>([]);

    function updateDateValue(e: ChangeEvent<HTMLInputElement>) {
        setDateFromAdmin(e.target.value)
    }

    function showBookingsByDate() {
        console.log(dateFromAdmin)
        let filterBookingsByDate = props.bookings.filter(
            booking => booking.date === dateFromAdmin
        )
        console.log(filterBookingsByDate)
        setAllBookingsFromDate(filterBookingsByDate)
    }

    function deleteBooking(id: string) {
        console.log(id)
        axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
        })
        window.location.reload(true);
    }
    
    let allBookings = allBookingsFromDate.map((table, i=parseInt(table.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {

            if(table.customerId === guest._id) {
                return(
                    <div className="table" key={i}>
                        <div className="first-sitting sitting table-active">
                            <h3>Tidig sittning</h3>
                            <input type="date" value={table.date} />
                            <input type="text" value={table.time} />
                            <input type="number" value={table.amountOfGuests} />
                            <input type="text" value={table.customerId} disabled />
                            <div><button onClick={() => deleteBooking(table._id)}>Ta bort bokning</button></div>
                            <input type="text" value={guest.email} />
                            <input type="text" value={guest.name} />
                            <input type="number" value={guest.phone} />
                            <input type="text" value={guest._id} disabled />
                        </div>
                    </div>
                )
            }
            else {
                return (<div>No bookings</div>)
            }
        })
    }) 

    return(
        <>

            <input type="date" value={dateFromAdmin} onChange={updateDateValue}></input>
            <button onClick={showBookingsByDate}>Visa bokningar</button>
            <div className="all-bookings"> {allBookings} </div> 
                
        </>
    )
}