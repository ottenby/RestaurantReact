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

    const [showSecondMessage, setSecondShowMessage] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [GDPR, setGDPR] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [aBooking, setABooking] = useState({
        _id:   '',
        name: '',
        amountOfGuests: '',
        customerId: '',
        time: '',
        date: '',
        phone: "",
        email: ""
    });

    function checkSecondValidation() {
        if(secondFormData.name !== '' && secondFormData.email !== '' && secondFormData.phone !== '' && GDPR) {
            setIsValid(true)
        }
    };
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
    };

    function handleCheckBoxClick() {
        setGDPR(!GDPR);
    };

    function openPopup() {
        setShowPopup(true);
    };

    function closePopup() {
        setShowPopup(false);
    };

    // let aBooking = new Booking();
    function newBooking(text: string) {
        setSecondShowMessage(true);
        aBooking.time = text;
        aBooking.amountOfGuests = props.formData.numberOfGuests;
        aBooking.date = props.formData.date;
        aBooking.name = secondFormData.name;
        aBooking.phone = secondFormData.phone;
        aBooking.email = secondFormData.email;
        setABooking(aBooking);
        checkSecondValidation();
    };

    function postBooking(aBooking: IBooking) {
        axios.post('http://localhost:8000/', aBooking)
        .then((response) => {
            props.updateBookings(response.data);
        })
        openPopup();
    };
    
    return(
    <>
    <div className="second-booking-form" id="second-form">
    <div><input
        type="text"
        name="name"
        placeholder="Namn" className="customer-info-input"
        onChange={e => updateSecondFormValues(e, "name")}
        /></div>
        <div><input
        type="text"
        name="mobile"
        placeholder="Telefonnummer"
        className="customer-info-input"
        onChange={e => updateSecondFormValues(e, "phone")}
        /></div>
        <div><input
        type="text"
        name="email"
        placeholder="Email"
        className="customer-info-input"
        onChange={e => updateSecondFormValues(e, "email")}
        /></div>
       
    <div><input name="gdpr" type="checkbox" onClick={() => handleCheckBoxClick()} /> Jag godkänner att mina personuppgifter lagras</div>
    {props.earlyBookings && props.earlyBookings.length < 14 &&   <button className="time-buttons" onClick={()=> {newBooking('18.00')}}>18.00</button>  }
    {props.lateBookings && props.lateBookings.length < 14 &&   <button className="time-buttons" onClick={()=> {newBooking('20.30')}}>20.30</button>  }
    
    {isValid && <div><button className="book-button" onClick={() => postBooking(aBooking)}>Boka</button></div> }
    {showSecondMessage && secondMessage()}
    </div>

    {showPopup && (
        <div className="popup-background">
            <div className="popup-container">
                <p className="confirmed-booking-info">
                    Tack för din bokning!<br/><br />
                    Du kommer snart att få en bekräftelse på din bokning skickad till dig via mejl. 
                    Om du har några frågor eller funderingar är du varmt välkommen att ringa till oss på Purple Nurples på nedan nummer:
                    08-666666.
                    <br /> <br />
                    <hr />
                    Vi ser fram emot att få erbjuda dig en riktig smaksensation inom en snar framtid!
                    <br />
                    <br />
                    - Purple Nurple
                </p>
                <button className="close-popup-btn" onClick={closePopup}>Tack och hej leverpastej</button>
            </div>
        </div>
    )}
    </>
    )
}