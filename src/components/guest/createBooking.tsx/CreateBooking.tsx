import React, { useState } from 'react';
import axios from 'axios';
import { IFormData, IBooking } from '../GuestParent';

export class Booking {
    _id: string = '';
    guestName: string = '';
    amountOfGuests: string = '';
    customerId: string = '';
    time: string = '';
    date: string = '';
    bookingActive: boolean = false;
    bookingFinished: boolean = false;
    phone: string = "";
    email: string = "";

   }

export interface ISecondFormData {
    phone: "",
    email: "",
}

//LOREM

export interface ICreatingBookingProps {
    formData: IFormData
    lateBookings?: IBooking[];
    earlyBookings?: IBooking[];
}

export default function CreateBooking(props: ICreatingBookingProps) {

    const [secondFormData, setSecondFormData] = useState<ISecondFormData>({
        phone: "",
        email: "",
    });

    function updateSecondFormValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof ISecondFormData
        ) {
        setSecondFormData({ ...secondFormData, [id]: e.target.value});
    }



    let aBooking = new Booking();
    function newBooking(text: string) {
    
        aBooking.time = text;
        aBooking.bookingFinished = false;
        aBooking.bookingActive = true;
        aBooking.amountOfGuests = props.formData.numberOfGuests;
        aBooking.date = props.formData.date;
        aBooking.guestName = props.formData.name;
        aBooking.phone = secondFormData.phone;
        aBooking.email = secondFormData.email;
        // aBooking.customerId =
        // setReadyToSend(true)
        testFunction(aBooking);
    }


    function testFunction(aBooking: Booking) {
        axios.post('http://localhost:8000/', aBooking)
        .then((response) => {
            console.log(response.data)
        })
    }


    
    return(
    <>
    <div>Printar ut data från checkiftableavailable {props.formData.name} </div>
    <div className="second-form" id="second-form">
        <input
        type="text"
        name="mobile"
        placeholder="Phone Number"
        className="mobile"
        onChange={e => updateSecondFormValues(e, "phone")}
        />
        <input
        type="text"
        name="email"
        placeholder="Email"
        className="email"
        onChange={e => updateSecondFormValues(e, "email")}
        />
        
    {props.earlyBookings && props.earlyBookings.length < 14 &&   <button onClick={()=> {newBooking('18.00')}}>18.00</button>  }
    {props.lateBookings && props.lateBookings.length < 14 &&   <button onClick={()=> {newBooking('20.30')}}>20.30</button>  }
        
    
    </div>
    </>
    )
}