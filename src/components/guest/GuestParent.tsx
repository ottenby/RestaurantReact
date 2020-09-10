import React, { useState } from "react";
import CheckIfTableAvailable from "./checkIfTableAvailable/CheckIfTableAvailable";
import { CreateBooking } from "./createBooking/CreateBooking";

export interface IFormData {
  date: string;
  numberOfGuests: string;
  phone?: string;
  email?: string;
}

export interface IBooking {
  amountOfGuests: string;
  customerId: string;
  _id: string;
  time: string;
  date: string;
}

export interface IGuest {
    _id: string;
    name: string;
    phone: string;
    email: string;
}

interface IGuestParentProps {
    bookings: IBooking[];
    setBookings: (booking: IBooking[]) => void;
    guests: IGuest[];
    setGuests: (guest: IGuest[]) => void;
    updateBookings: (b: IBooking) => void;
}

export function GuestParent(props: IGuestParentProps) {

    //State-variabel som lagrar värden från input-fälten från child CheckIfTableAvailable
    const [formData, setFormData] = useState<IFormData>({
        date: "",
        numberOfGuests: ""
    });
    //State-variabel för tidiga bokningar
    const [earlyBookings, setEarlyBookings] = useState<IBooking[]>();
    //State-variabel för sena bokningar
    const [lateBookings, setLateBookings] = useState<IBooking[]>();
    //State-variabel som uppdaterar datum vid klick
    const [date, setDate] = useState("");
    //State-variabel av typen boolean som bestämmer om vi ska skriva ut validerings-meddelanden eller ej
    const [showMessage, setShowMessage] = useState(false);

    //Funktion som uppdaterar statet formData vid onchange. Data kommer från inputfält och react-calendar
    function updateFormValues(
        e: React.ChangeEvent<HTMLInputElement>,
        id: keyof IFormData
    ) {
        setFormData({ ...formData, [id]: e.target.value, date});
    };

    //Lifting state up från child (checkiftableavailabe) där vi får datum från react-calendar
    function updateDateFromChild(date: string) {
        setDate(date)
    };

    //Funktion som visar valideringsmeddelande om något input-fält saknar info
    function message() {
        if(formData.date === '' && formData.numberOfGuests === '') {
        return(
            <div>Du måste fylla i datum och antal gäster</div>
        )
        }
        if(formData.date === '') {
        return (<div>Du måste välja ett datum</div>)
        }
        if(formData.numberOfGuests === '') {
        return (<div>Du måste ange antal gäster</div>)
        }
    };
    
    //Lifting state up där vi får den postade bokningen från child (createbooking) och skickar upp till grandparent (app)
    function sendDataToParent(b: IBooking) {
        props.updateBookings(b);
    };

    //Funktion som kollar om alla input-fält är ifyllda korrekt
    function checkValidation() {
        setShowMessage(true)
        if(formData.date !== '' && formData.numberOfGuests !== '') {
            checkAvailability()
        }
        return null
    };

    //Kollar om det finns lediga bord på valt datum. Returnerar först en array med alla bokningar på valt datum
    //Sedan delas den upp i två nya arrayer, där det är uppdelat på tidig och sen sittning
    function checkAvailability() {
        let listOfBookingsSameDay = props.bookings.filter(
        booking => booking.date === formData.date
        );

        let earlyBookingsData: IBooking[] = [];
        let lateBookingsData: IBooking[] = [];

        for (let i = 0; i < listOfBookingsSameDay.length; i++) {
        if (listOfBookingsSameDay[i].time === "18.00") {
            earlyBookingsData.push(listOfBookingsSameDay[i]);
        } else {
            lateBookingsData.push(listOfBookingsSameDay[i]);
        }
        };
        //Sätter staten som sedan kontrollerar om knapparna för tiderna 18 och 20.30 ska renderas ut
        setEarlyBookings(earlyBookingsData);
        setLateBookings(lateBookingsData);
    };

    return (
        <React.Fragment>
        <CheckIfTableAvailable
            formData={formData}
            checkAvailability={checkAvailability}
            updateFormValues={updateFormValues}
            earlyBookings={earlyBookings}
            lateBookings={lateBookings}
            checkValidation={checkValidation}
            validationMessage = {message}
            showMessage = {showMessage}
            updateDate={updateDateFromChild}
        ></CheckIfTableAvailable>

        {/* Createbooking-komponenten existerar först om det finns mindre än 15 bord bokade på antingen tidiga eller sena sittningen */}
        {((earlyBookings && earlyBookings.length < 14) ||
            (lateBookings && lateBookings.length < 14)) && (
            <CreateBooking
                bookings={props.bookings}
                setBookings={props.setBookings}
            guestList={props.guests}
            formData={formData}
            earlyBookings={earlyBookings}
            lateBookings={lateBookings}
            updateBookings={sendDataToParent}
            />
        )}
        </React.Fragment>
    );
}
