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

    //State-variabel av typen boolean som bestämmer om vi ska skriva ut validerings-meddelanden eller ej
    const [showSecondMessage, setSecondShowMessage] = useState(false);
    //Om alla värden är ifyllda korrekt så sätts isValid-statet till true och boka knappen syns
    const [isValid, setIsValid] = useState(false);
    //Om gdpr checkboxen är ibockad eller inte
    const [GDPR, setGDPR] = useState(false);
    //Vid boka-knapp så sätts showPopup värdet till true, och en popup dyker upp
    const [showPopup, setShowPopup] = useState(false);
    //State-variabel som lagrar värden från input-fälten
    const [secondFormData, setSecondFormData] = useState<ISecondFormData>({
        name:"",
        phone: "",
        email: "",
    });
    //State-variabel som lagrar en ny bokning från alla inputfälten
    const [aBooking, setABooking] = useState({
        _id: '',
        name: '',
        amountOfGuests: '',
        customerId: '',
        time: '',
        date: '',
        phone: "",
        email: ""
    });

    //Funktion som uppdaterar statet updateBookings vid onchange. Data kommer från inputfält och react-calendar
    function updateSecondFormValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof ISecondFormData
        ) {
        setSecondFormData({ ...secondFormData, [id]: e.target.value});
    }

    //Funktion som kollar om alla input-fält är ifyllda korrekt
    function checkSecondValidation() {
        if(secondFormData.name !== '' && secondFormData.email !== '' && secondFormData.phone !== '' && GDPR) {
            setIsValid(true)
        }
    };

    //Funktion som visar valideringsmeddelande om något input-fält saknar info
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

    //Funktion som togglar mellan true och false på GDPR checkboxen
    function handleCheckBoxClick() {
        setGDPR(!GDPR);
    };

    //Funktion som öppnar popupen
    function openPopup() {
        setShowPopup(true);
    };

    //Funktion som stänger popupen
    function closePopup() {
        setShowPopup(false);
        window.location.href="/";
    };

    //Funktion som skapar en bokning med data från alla input-fält och knapptryck
    function newBooking(text: string) {
        setSecondShowMessage(true);
        aBooking.time = text;
        aBooking.amountOfGuests = props.formData.numberOfGuests;
        aBooking.date = props.formData.date;
        aBooking.name = secondFormData.name;
        aBooking.phone = secondFormData.phone;
        aBooking.email = secondFormData.email;
        //Sparar aBooking i aBooking-statet
        setABooking(aBooking);
        //Check-validation funktionen körs, kollar att allt är korrekt ifyllt
        checkSecondValidation();
    };

    //Här postar vi bokningen mot databasen, och öppnar en popup
    function postBooking(aBooking: IBooking) {
        axios.post('http://localhost:8000/', aBooking)
        .then((response) => {
            props.updateBookings(response.data);
        })
        openPopup();
    };
    
    return(
    <>
    {/*HTML för inputfälten*/}
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
    {/*Dessa knappar renderas bara när det finns mindre än 15 bokningar på valt datum*/}
    {props.earlyBookings && props.earlyBookings.length < 14 &&   <button className="time-buttons" onClick={()=> {newBooking('18.00')}}>18.00</button>  }
    {props.lateBookings && props.lateBookings.length < 14 &&   <button className="time-buttons" onClick={()=> {newBooking('20.30')}}>20.30</button>  }
    
    {isValid && <div><button className="book-button" onClick={() => postBooking(aBooking)}>Boka</button></div>}
    {showSecondMessage && secondMessage()}
    </div>

    {/*HTML för popupen som visas om showPopup är true*/}
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
                {/*Stänger popupen*/}
                <button className="close-popup-btn" onClick={closePopup}>Tack och hej leverpastej</button>
            </div>
        </div>
    )}
    </>
    )
}