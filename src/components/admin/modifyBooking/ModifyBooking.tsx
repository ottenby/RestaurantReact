import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IBooking } from "../AdminParent";
import { IGuest } from "../../guest/GuestParent";
import axios from "axios";

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
    bookingActive: boolean;
    bookingFinished: boolean;
}

export class UpdateBooking {
    date: string = "";
    time: string = "";
    amountOfGuests: string = "";
    _id: string = "";
    customerId: string = "";
}
    
    export function ModifyBooking(props: IModifyBookingProps) {

        const [updateBookings, setUpdateBookings] = useState<IUpdateBooking>({
            amountOfGuests: "",
            time: "",
            date: "",
            _id: "",
            customerId: "",
            bookingActive: true,
            bookingFinished: false,
        })
        
        let {id} = useParams();
       
        
        useEffect(() => {
            props.bookings.forEach(booking => {
                if(booking._id === id) {
                    props.guests.forEach(guest => {
                        let parentBooking: IUpdateBooking = {
                            date: booking.date,
                            time: booking.time,
                            amountOfGuests: booking.amountOfGuests,
                            _id: booking._id,
                            customerId: guest._id,
                            bookingActive: booking.bookingActive,
                            bookingFinished: booking.bookingFinished
                        }
                        setUpdateBookings(parentBooking)
                    });
                }
            });
        }, [])

        function updateBookingValues(
            e: React.ChangeEvent<HTMLInputElement>,
            id: keyof IUpdateBooking
            ) {
            setUpdateBookings({ ...updateBookings, [id]: e.target.value });
        }

        function updateButtonValues(
            e: string,
            id: keyof IUpdateBooking
        ) {
            setUpdateBookings({ ...updateBookings, [id]: e});
        }
    
        function saveUpdatedBooking() {
            axios.put("http://localhost:8000/admin/update/" + id, {updateBookings})
            .then(response => {
                props.setBookings(response.data)
            })
        }

            let theBooking = (
                <div className="booking">
                <div className="first-sitting sitting booking-active">
                    <h3>Bokning</h3>
                    <input type="date" name="date" value={updateBookings.date} onChange={e => updateBookingValues(e, "date")} />
                    Gammal tid:<p>{updateBookings.time}</p>
                    <p>Ny tid: </p><button onClick={e => updateButtonValues("18.00", "time")}>18:00</button>
                    <button onClick={e => updateButtonValues("20.30", "time")}>20:30</button>
                    <p>Antal gäster:</p><input type="number" name="amountOfGuests" min="1" max="6" 
                    placeholder={updateBookings.amountOfGuests} onChange={e => updateBookingValues(e, "amountOfGuests")} />
                    {/* <p>{guest.email}</p>
                    <p>{guest.name}</p>
                    <p>{guest.phone}</p> */}
                    <div><button onClick={() => saveUpdatedBooking()}>Spara ny bokning</button></div>   
                </div>
            </div>
            )
                
        return(
            <React.Fragment>
            <div>{theBooking}</div> 
            </React.Fragment>
    
        )
    }
