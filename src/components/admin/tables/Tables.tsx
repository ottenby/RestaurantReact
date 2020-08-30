
import './Tables.css'
import React from 'react';
import { IBooking } from '../AdminParent';

interface IpropsTable{
    bookings:IBooking[]
   // earlyBookings?:IBooking[]
  //  lateBookings?:IBooking[]
 //   checkAvailability( from:IBooking):void
}

export function Tables(props:IpropsTable) {


    let tableElements = props.bookings.map((table, i=parseInt(table.customerId))=> {
       
        return(
            <div className="table" key={i}>
                <h3> {`Datum: ${table.date}`} </h3>
                <div className="first-sitting sitting table-active">
                    <h5> {`Tid: ${table.time}`}</h5>
                    <h5> {`Gäster: ${table.amountOfGuests}/6`}</h5>
                    <p> {`- id:  ${table.customerId}`} </p>
                </div>
            </div>
            
        )
    }) 
 

    return(
        <React.Fragment>
            <div className="floor"> {tableElements} </div>
        </React.Fragment>
    )
}