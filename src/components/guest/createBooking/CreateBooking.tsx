import React, { useState } from 'react';
import axios from 'axios';
import { IFormData, IBooking, IGuest } from '../GuestParent';

export interface ISecondFormData {
    phone: "",
    name:"",
    email: "",
}

export interface ICreatingBookingProps {
    formData: IFormData
    guestList: IGuest[]
    lateBookings?: IBooking[];
    earlyBookings?: IBooking[];
    bookings: IBooking[]
    setBookings: (booking: IBooking[]) => void;
    updateBookings: (b: IBooking) => void;
}

export function CreateBooking(props: ICreatingBookingProps) {

    
    const [secondFormData, setSecondFormData] = useState<ISecondFormData>({
        name:"",
        phone: "",
        email: "",
    });

    function updateSecondFormValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof ISecondFormData
        ) {
        setSecondFormData({ ...secondFormData, [id]: e.target.value});
    }

    const [showSecondMessage, setSecondShowMessage] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [GDPR, setGDPR] = useState(false);
    const [aBooking, setABooking] = useState({
        _id:   '',
        name: '',
        amountOfGuests: '',
        customerId: '',
        time: '',
        date: '',
        bookingActive: false,
        bookingFinished: false,
        phone: "",
        email: ""
    })

    function checkSecondValidation() {
        if(secondFormData.name !== '' && secondFormData.email !== '' && secondFormData.phone !== '' && GDPR) {
            setIsValid(true)
        }
    }
    function secondMessage() {
      if(secondFormData.email === '' && secondFormData.phone === '' && secondFormData.name === '') {
        return(
          <div>Du måste fylla i namn, telefonnummer och email</div>
        )
      }
      if(secondFormData.name === '') {
        return (<div>Du måste fylla i ditt namn</div>)
      }
      if(secondFormData.phone === '') {
        return (<div>Du måste fylla i ditt telefonnummer</div>)
      }
      if(secondFormData.email === '') {
        return (<div>Du måste fylla i din mailadress</div>)
      }
      if(!GDPR) {
          return (<div>Du måste godkänna användningen av dina personuppifter</div>)
      }
    }

    function handleCheckBoxClick() {
        setGDPR(!GDPR)
    }

    // let aBooking = new Booking();
    function newBooking(text: string) {
        setSecondShowMessage(true);
        aBooking.time = text;
        aBooking.bookingFinished = false;
        aBooking.bookingActive = true;
        aBooking.amountOfGuests = props.formData.numberOfGuests;
        aBooking.date = props.formData.date;
        aBooking.name = secondFormData.name;
        aBooking.phone = secondFormData.phone;
        aBooking.email = secondFormData.email;
        setABooking(aBooking)
        checkSecondValidation();
    }

    function postBooking(aBooking: IBooking) {
        axios.post('http://localhost:8000/', aBooking)
        .then((response) => {
            props.updateBookings(response.data)
        })
    }
    
    return(
    <>
    <div className="second-booking-form" id="second-form">
    <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={e => updateSecondFormValues(e, "name")}
        />
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
       
        <div><input name="gdpr" type="checkbox" onClick={() => handleCheckBoxClick()} /> Jag godkänner att mina personuppgifter lagras</div>
    {props.earlyBookings && props.earlyBookings.length < 14 &&   <button onClick={()=> {newBooking('18.00')}}>18.00</button>  }
    {props.lateBookings && props.lateBookings.length < 14 &&   <button onClick={()=> {newBooking('20.30')}}>20.30</button>  }
    
    {isValid && <div><button onClick={() => postBooking(aBooking)}>Boka</button></div> }
    {showSecondMessage && secondMessage()}
    </div>
    </>
    )
}