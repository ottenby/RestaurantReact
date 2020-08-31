import './Tables.css'
import React from 'react';
import { IBooking } from '../AdminParent';
import { Link } from 'react-router-dom';

interface IpropsTable{
    bookings:IBooking[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    checkAvailability: () => void; 
}

export function Tables(props:IpropsTable) {

    console.log(props.bookings)

    
    let allBookings = props.bookings.map((table, i=parseInt(table.customerId))=> {

        return(
            <div className="table" key={i}>
                
                <Link to={'/admin/'+table._id}>
                    <div className="first-sitting sitting table-active">
                        <h3>Tidig sittning</h3>
                        <h4> {`Datum: ${table.date}`} </h4>
                        <h5> {`Tid: ${table.time}`}</h5>
                        <h5> {`Gäster: ${table.amountOfGuests}/6`}</h5>
                        <p> {`- id:  ${table.customerId}`} </p>
                    </div>
                </Link>
            </div>
            
        )
    }) 

    return(
        <>
  
            <button onClick={() => props.checkAvailability()}>Bokningar</button> 
            <div className="all-bookings"> {allBookings} </div> 
                
        </>
    )
}