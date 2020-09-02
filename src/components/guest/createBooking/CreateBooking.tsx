import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IFormData, IBooking, IGuest } from '../GuestParent';

export class Booking {
    _id: string = '';
    name: string = '';
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
    name:"",
    email: "",
}

//LOREM

export interface ICreatingBookingProps {
    formData: IFormData
    guestList: IGuest[]
    lateBookings?: IBooking[];
    earlyBookings?: IBooking[];
}

export function CreateBooking(props: ICreatingBookingProps) {

    
    const [secondFormData, setSecondFormData] = useState<ISecondFormData>({
        name:"",
        phone: "",
        email: "",
    });
    
    const [idToNumber, setIdToNumber] = useState(localStorage.getItem("id") || 0);

    useEffect(() => {
        let idToNumberStringify = JSON.stringify(idToNumber)
        localStorage.setItem('id', idToNumberStringify);
      }, [idToNumber]);

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
        aBooking.name = secondFormData.name;
        aBooking.phone = secondFormData.phone;
        aBooking.email = secondFormData.email;
        aBooking.customerId = idToNumber.toString();

        props.guestList.forEach(guest => {
            if(guest.customerId !== aBooking.customerId) {
                updateCustomerId(aBooking.customerId);
                console.log(guest)
            }
            else {
                console.log("Halloj")
            }
        });
        testFunction(aBooking);
    }
    console.log(aBooking);

    function updateCustomerId(id: string) {
        console.log(id);
        let idToNumber = parseInt(id)
        idToNumber++
        setIdToNumber(idToNumber)
    }

    console.log(idToNumber)

    function testFunction(aBooking: Booking) {
        axios.post('http://localhost:8000/', aBooking)
        .then((response) => {
            console.log(response.data)
        })
        // checkForDubbles()
    }
    // function checkForDubbles() {

    //         let newArray: IGuest[] =props.guestList.filter((guest: IGuest)=> 
    //             guest.email === aBooking.email
    //         )
    //         if(newArray.length >1) {
    //             props.guestList.pop()

    //         }
    //         console.log(props.guestList);
    // }


    
    return(
    <>
    <div>Printar ut data från checkiftableavailable {props.formData.date} </div>
    <div className="second-form" id="second-form">
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
        
    {props.earlyBookings && props.earlyBookings.length < 14 &&   <button onClick={()=> {newBooking('18.00')}}>18.00</button>  }
    {props.lateBookings && props.lateBookings.length < 14 &&   <button onClick={()=> {newBooking('20.30')}}>20.30</button>  }
        
    
    </div>
    </>
    )
}