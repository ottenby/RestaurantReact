import React, { ChangeEvent, useState } from 'react';
import { IBooking } from '../AdminParent';
import { IGuest } from '../../guest/GuestParent';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

interface IpropsTable{
    bookings:IBooking[]
    guests:IGuest[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    newArrayWithDeletedBooking: (id: string) => void;
}

export function Tables(props: IpropsTable) {

    const [dateFromInput, setDateFromInput] = useState("");
    const [allBookings, setAllBookings] = useState<IBooking[]>([]);
    const [showFilteredBookings, setshowFilteredBookings] = useState(false);

    function updateDateValue(e: Date) {
        let dateString =
        e.toLocaleDateString(undefined, {year: "numeric"}) + "-" +
        e.toLocaleDateString(undefined, { month: '2-digit' }) + "-" +
        e.toLocaleDateString(undefined, { day: '2-digit' });
        console.log(dateString);
        setDateFromInput(dateString);
    };

    function showBookingsByDate() {
        let filterBookingsByDate = props.bookings.filter((booking) => { 
                if(booking.date === dateFromInput) {
                    return booking
                }
                return null
            });
            setshowFilteredBookings(true);
        setAllBookings(filterBookingsByDate);
    };

    function deleteBooking(id: string) {
        axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
            const deleteBooking = allBookings.filter((b) => {
                if (b._id !== id) {
                    return b;
                }
                return null;
            })
            setAllBookings(deleteBooking);
            props.newArrayWithDeletedBooking(id);
        })
    };

    let theBookings = allBookings.map((table, i=parseInt(table.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {

            if(table.customerId === guest._id) {
                return(
                    <div className="sittings table-active" id="first-sitting" key={i}>
                        <h3>Bokning</h3>
                        <p className="booking-info"><span>Datum:</span> <span>{table.date}</span></p>
                        <p className="booking-info"><span>Tid:</span> <span>{table.time}</span></p>
                        <p className="booking-info"><span>Antal gäster:</span> <span>{table.amountOfGuests}</span></p>
                        <p className="booking-info"><span>Email:</span> <span>{guest.email}</span></p>
                        <p className="booking-info"><span>Namn:</span> <span>{guest.name}</span></p>
                        <p className="booking-info"><span>Telefonnummer:</span> <span>{guest.phone}</span></p>
                        <div><button className="admin-buttons" onClick={() => deleteBooking(table._id)}>Ta bort bokning</button></div>
                        <div><Link to={'/admin/update/'+table._id}><button className="admin-buttons">Uppdatera bokning</button></Link></div> 
                    </div>
                )
            }
            return null
        })
    }) 

    return(
        <>
        <div className="show-sittings">
        <Calendar onClickDay={updateDateValue} />
            {/* <input type="date" value={dateFromInput} onChange={updateDateValue}></input> */}
            <button className="show-bookings-button" onClick={() => showBookingsByDate()}>Visa bokningar</button>
            </div>
            {showFilteredBookings ?
            <div className="all-bookings"> {theBookings} </div> 
            : null}  
        </>
    )
}