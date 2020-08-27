import React, { useState } from 'react';

import { CreateBooking } from './createBooking/CreateBooking';
import { CheckIfTableAvailable } from './checkIfTableAvailable/CheckIfTableAvailable';


export interface IFormData {
    name: string;
    date: string;
    numberOfGuests: string;
    phone: string;
    email: string;
  }

  export interface IBooking {
    _id: string;
    guestName: string;
    amountOfGuests: string;
    customerId: string;
    time: string,
    date: string,
    bookingActive: boolean;
    bookingFinished: boolean;
  }

export function GuestParent() {

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        numberOfGuests: "",
    })

    function updateFormData(dataFromForm: IFormData) {
        setFormData(dataFromForm);
    }

    return(
        <React.Fragment>
            <CheckIfTableAvailable sendFormData={updateFormData}></CheckIfTableAvailable>
            <CreateBooking formData={formData}></CreateBooking>
        </React.Fragment>
    )
}