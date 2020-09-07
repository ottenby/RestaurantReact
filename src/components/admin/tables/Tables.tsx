import './Tables.css'
import React, { ChangeEvent, useState } from 'react';
import { IBooking, IUpdateBooking } from '../AdminParent';
import { IGuest } from '../../guest/GuestParent';
import axios from 'axios';

interface IpropsTable{
    bookings:IBooking[]
    guests:IGuest[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    updateBookingValues: (
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IUpdateBooking
      ) => void;
    updateOneBooking: (id: string) => void;
    changeBooking: (text: string, guestId: string) => void;
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
        })
    }
    
    let theBookings = allBookings.map((table, i=parseInt(table.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {

            if(table.customerId === guest._id) {
                return(
                    <div className="table" key={i}>
                        <div className="first-sitting sitting table-active">
                            <h3>Bokning</h3>
                            <input type="date" name="date" placeholder={table.date} onChange={e => props.updateBookingValues(e, "date")} />
                            Gammal tid:<p>{table.time}</p>
                            <p>Ny tid: </p><button onClick={() => {props.changeBooking("18.00", guest._id)}}>18:00</button>
                            <button onClick={() => {props.changeBooking("20.30", guest._id)}}>20:30</button>
                            <p>Antal gäster:</p><input type="number" name="amountOfGuests" min="1" max="6" 
                            placeholder={table.amountOfGuests} onChange={e => props.updateBookingValues(e, "amountOfGuests")} />
                            <p>{guest.email}</p>
                            <p>{guest.name}</p>
                            <p>{guest.phone}</p>
                            <div><button onClick={() => deleteBooking(table._id)}>Ta bort bokning</button></div>
                            <div><button onClick={() => props.updateOneBooking(table._id)}>Uppdatera bokning</button></div>   
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