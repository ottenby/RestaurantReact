import React, { ChangeEvent, useState } from 'react';
import { IBooking } from '../AdminParent';
import { IGuest } from '../../guest/GuestParent';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IpropsTable{
    bookings:IBooking[]
    guests:IGuest[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    newArrayWithDeletedBooking: (b: IBooking[]) => void;
}

export function Tables(props: IpropsTable) {

    const [dateFromInput, setDateFromInput] = useState("");
    const [allBookings, setAllBookings] = useState<IBooking[]>([]);
    const [showFilteredBookings, setshowFilteredBookings] = useState(false);

    function updateDateValue(e: ChangeEvent<HTMLInputElement>) {
        setDateFromInput(e.target.value);
    }

    function showBookingsByDate() {
        let filterBookingsByDate = props.bookings.filter((booking) => { 
                if(booking.date === dateFromInput) {
                    return booking
                }
                return null
            })
            setshowFilteredBookings(true)
        setAllBookings(filterBookingsByDate)
    }

    function deleteBooking(id: string) {
        axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
            console.log(props.bookings)
            const deleteBooking = allBookings.filter((b) => {
                if (b._id !== id) {
                    return b;
                }
                return null;
            })
            console.log("den filtrerade listan ", deleteBooking)
            setAllBookings(deleteBooking)
            props.newArrayWithDeletedBooking(deleteBooking)
        })
    }
    
    let theBookings = allBookings.map((table, i=parseInt(table.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {

            if(table.customerId === guest._id) {
                return(
                    <div className="table" key={i}>
                        <div className="first-sitting sitting table-active">
                            <h3>Bokning</h3>
                            <p>{table.date}</p>
                            <p>{table.time}</p>
                            <p>{table.amountOfGuests}</p>
                            <p>{guest.email}</p>
                            <p>{guest.name}</p>
                            <p>{guest.phone}</p>
                            <div><button onClick={() => deleteBooking(table._id)}>Ta bort bokning</button></div>
                            <div><Link to={'/admin/update/'+table._id}><button>Uppdatera bokning</button></Link></div> 
                        </div>
                    </div>
                )
            }
            return null
        })
    }) 

    console.log(allBookings)
    return(
        <>
            <input type="date" value={dateFromInput} onChange={updateDateValue}></input>
            <button onClick={() => showBookingsByDate()}>Visa bokningar</button>
            {showFilteredBookings ?
            <div className="all-bookings"> {theBookings} </div> 
            : null}  
        </>
    )
}