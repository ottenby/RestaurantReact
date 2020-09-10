import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IBooking } from "../AdminParent";
import { IGuest } from "../../guest/GuestParent";
import axios from "axios";
import Calendar from "react-calendar";

interface IModifyBookingProps {
    guests: IGuest[];
    bookings: IBooking[];
    setBookings: (booking: IBooking[]) => void;
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
    
    export function ModifyBooking(props: IModifyBookingProps) {
        //State-variabel som uppdaterar datum vid klick
        const [date, setDate] = useState("");
        //State-variabel som visar meddelande när bokningen är uppdaterad
        const [showUpdateMessage, setShowUpdateMessage] = useState(false);
        //State-variabel som uppdaterar bokningen i fråga
        const [updateBookings, setUpdateBookings] = useState<IUpdateBooking>({
            amountOfGuests: "",
            time: "",
            date: "",
            _id: "",
            customerId: ""
        });
        //Variabel id som tar emot id:t i params-urlen
        let {id} = useParams();
       
        //Hämtar alla bokningar från grandparent (App) vid sid-laddning
        useEffect(() => {
            props.bookings.forEach(booking => {
                if(booking._id === id) {
                    props.guests.forEach(guest => {
                        let parentBooking: IUpdateBooking = {
                            date: booking.date,
                            time: booking.time,
                            amountOfGuests: booking.amountOfGuests,
                            _id: booking._id,
                            customerId: guest._id
                        }
                        setUpdateBookings(parentBooking);
                    });
                };
            });
        }, []);

        //Funktion som omvandlar datum av typen Date i react-calendar, till string
        function updateDate(e: Date) {
            let dateString =
            e.toLocaleDateString(undefined, {year: "numeric"}) + "-" +
            e.toLocaleDateString(undefined, { month: '2-digit' }) + "-" +
            e.toLocaleDateString(undefined, { day: '2-digit' });
            setDate(dateString);
        };
        //Funktion som uppdaterar statet updateBookings vid onchange. Data kommer från inputfält och react-calendar
        function updateBookingValues(
            e: React.ChangeEvent<HTMLInputElement>,
            id: keyof IUpdateBooking
            ) {
            setUpdateBookings({ ...updateBookings, [id]: e.target.value, date });
        };
        //Funktion som uppdaterar statet updateBookings vid klick på knappar (tiderna). Data kommer från buttons
        function updateButtonValues(
            e: string,
            id: keyof IUpdateBooking
        ) {
            setUpdateBookings({ ...updateBookings, [id]: e});
        };
        //Funktion som sparar uppdaterad information och skickar till databasen
        function saveUpdatedBooking() {
            axios.put("http://localhost:8000/admin/update/" + id, {updateBookings})
            .then(response => {
                props.setBookings(response.data)
            });
            setShowUpdateMessage(true)
        };
        //Skapar upp vår html som ska visas i webbläsaren
        let theBooking = (
            <div className="one-sitting">
                <h3>Updatera bokning</h3>
                <div><Calendar onClickDay={updateDate} /></div>
                <p>Ny tid: </p><button className="time-buttons" onClick={e => updateButtonValues("18.00", "time")}>18:00</button>
                <button className="time-buttons" onClick={e => updateButtonValues("20.30", "time")}>20:30</button>
                <p>Antal gäster:</p><input type="number" name="amountOfGuests" min="1" max="6" 
                placeholder={updateBookings.amountOfGuests} onChange={e => updateBookingValues(e, "amountOfGuests")} />
                <div><button className="save-booking-btn" onClick={() => saveUpdatedBooking()}>Uppdatera bokning</button></div>   
                {showUpdateMessage && (<div>Bokningen är uppdaterad</div>)}
            </div>
        )
                
        return(
            <React.Fragment>
            <div>{theBooking}</div> 
            </React.Fragment>
    
        )
    }
