import React, { useState } from 'react';
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

    //State-variabel som uppdaterar datum vid klick
    const [dateFromInput, setDateFromInput] = useState("");
    //State-variabel som först sparar bokning på specifikt datum, sedan vid klick på delete sparar den filtrerade listan
    const [allBookings, setAllBookings] = useState<IBooking[]>([]);
    //State-variabel som bestämmer om vi ska visa bokningar eller inte
    const [showFilteredBookings, setshowFilteredBookings] = useState(false);

    //Funktion som omvandlar datum av typen Date i react-calendar, till string
    function updateDateValue(e: Date) {
        let dateString =
        e.toLocaleDateString(undefined, {year: "numeric"}) + "-" +
        e.toLocaleDateString(undefined, { month: '2-digit' }) + "-" +
        e.toLocaleDateString(undefined, { day: '2-digit' });
        setDateFromInput(dateString);
    };
    //Funktion som jämför datum på bokningar med datum från kalender och uppdaterar state-variabeln allBookings
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
    //Funktion som tar bort bokning från databasen med hjälp av id, och returnerar den uppdaterade listan som vi lägger in i allBookings-statet
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
    //Mapar igenom en array av bokningar och gäster, och skapar html
    let theBookings = allBookings.map((booking, i=parseInt(booking.customerId))=> {

        return props.guests.map((guest, i=parseInt(guest._id)) => {
            //Om bokningens kund-id är samma som gästens id så skrivs bokningen ut innehållande bokning och gäst
            if(booking.customerId === guest._id) {
                return(
                    <div className="sittings booking-active" id="first-sitting" key={i}>
                        <h3>Bokning</h3>
                        <p className="booking-info"><span>Datum:</span> <span>{booking.date}</span></p>
                        <p className="booking-info"><span>Tid:</span> <span>{booking.time}</span></p>
                        <p className="booking-info"><span>Antal gäster:</span> <span>{booking.amountOfGuests}</span></p>
                        <p className="booking-info"><span>Email:</span> <span>{guest.email}</span></p>
                        <p className="booking-info"><span>Namn:</span> <span>{guest.name}</span></p>
                        <p className="booking-info"><span>Telefonnummer:</span> <span>{guest.phone}</span></p>
                        <div><button className="admin-buttons" onClick={() => deleteBooking(booking._id)}>Ta bort bokning</button></div>
                        <div><Link to={'/admin/update/'+booking._id}><button className="admin-buttons">Uppdatera bokning</button></Link></div> 
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
            <button className="show-bookings-button" onClick={() => showBookingsByDate()}>Visa bokningar</button>
            </div>
            {showFilteredBookings ?
            <div className="all-bookings"> {theBookings} </div> 
            : null}  
        </>
    )
}